import { Module } from '@nestjs/common';
import { HashService } from '~/domain/auth/services/hash.service';
import { VerificationService } from '~/domain/auth/services/verification.service';
import { MailModule } from '~/infrastructure/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '~/domain/user/user.module';
import { PrismaService } from '~/infrastructure/db/prisma.service';
import { AuthService } from '~/domain/auth/services/auth.service';
import { AuthController } from '~/domain/auth/controller/auth.controller';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MailModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('AUTH_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [HashService, VerificationService, PrismaService, AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
