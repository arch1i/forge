import { AppModule } from './../../../application/app.module';
import { UserModule } from '~/domain/user/user.module';
import { AuthModule } from '~/domain/auth/auth.module';
import { UserRepository } from '~/domain/user/services/user.repository';
import { PrismaService } from '~/infrastructure/db/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProvider } from '@prisma/client';
import { HashService } from '~/domain/auth/services/hash.service';
import { VerificationService } from '~/domain/auth/services/verification.service';
import { SendgridService } from '~/infrastructure/mail/services/sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { SENDGRID_SERVICE } from '~/infrastructure/mail/config/constants';
import { AuthService } from '~/domain/auth/services/auth.service';
import { AuthController } from '~/domain/auth/controller/auth.controller';

const TEST_USER = {
    email: 'alexborysovdev@gmail.com',
    name: 'alex',
    notificationProvider: 'TELEGRAM' as NotificationProvider,
    password: 'long-password',
    phoneNumber: '48562933119',
    surname: 'surname',
};

describe('auth-controller', () => {
    let authController: AuthController;
    let authService: AuthService;
    let user: UserRepository;
    let db: PrismaService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                UserModule,
                AppModule,
                JwtModule.registerAsync({
                    useFactory: async (config: ConfigService) => ({
                        secret: config.get('AUTH_SECRET_KEY'),
                    }),
                    inject: [ConfigService],
                }),
            ],
            controllers: [AuthController],
            providers: [
                AuthService,
                HashService,
                VerificationService,
                PrismaService,
                SendgridService,
                MailService,
                {
                    provide: SENDGRID_SERVICE,
                    useValue: {
                        send: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = app.get<AuthService>(AuthService);
        authController = app.get<AuthController>(AuthController);
        user = app.get<UserRepository>(UserRepository);
        db = app.get<PrismaService>(PrismaService);

        await db.verificationCode
            .delete({
                where: {
                    email: TEST_USER.email,
                },
            })
            .catch(() => 'code is not found');
        await user
            .delete({
                where: {
                    email: TEST_USER.email,
                },
            })
            .catch(() => 'user is not found');
    });

    it('should return tokens which include user-id', async () => {
        const newUser = await authController.signUp(TEST_USER);
        expect(newUser).toBeDefined();

        if (newUser) {
            await db.user.update({
                where: {
                    id: newUser.id,
                },
                data: {
                    verified: true,
                },
            });

            const res = await authController.login({
                email: newUser.email,
                password: TEST_USER.password,
            });

            expect(res.tokens.access).toBeDefined();
            expect(res.tokens.access).toBeDefined();

            const sessionUser = await authService.checkSession({
                headers: {
                    authorization: `Bearer ${res.tokens.access}`,
                },
            } as any);
            expect(sessionUser).toBeDefined();
        }
    });
});
