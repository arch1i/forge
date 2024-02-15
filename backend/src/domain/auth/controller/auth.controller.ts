import { AuthService } from '~/domain/auth/services/auth.service';
import { HashService } from '~/domain/auth/services/hash.service';
import { VerificationService } from '~/domain/auth/services/verification.service';
import { UserRepository } from '~/domain/user/services/user.repository';
import {
    Body,
    Controller,
    Get,
    HttpException,
    InternalServerErrorException,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginDto, SignUpDto, VerificationDto } from '../dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userRepository: UserRepository,
        private hashService: HashService,
        private verificationService: VerificationService,
        private authService: AuthService,
    ) {}

    @Post('sign-up')
    async signUp(@Body() credentials: SignUpDto) {
        const hashedPassword = await this.hashService.hash(credentials.password);
        const user = {
            ...credentials,
            password: hashedPassword,
        };

        const createdUser = await this.userRepository.create(user);
        if (!createdUser) throw new HttpException('Unable to create this user', 409);

        this.verificationService.sendVerificationCode({
            email: createdUser.email,
        });

        return { createdUser };
    }

    @Put('verify')
    async verify(@Body() { code, email }: VerificationDto) {
        const user = await this.verificationService.verify({ code, email });
        if (!user?.verified) throw new InternalServerErrorException();

        return {
            verified: user.verified,
        };
    }

    @Post('login')
    async login(@Body() data: LoginDto) {
        return await this.authService.login(data);
    }

    @Get('session')
    async session(@Req() req: Request) {
        const session = await this.authService.checkSession(req);
        return session;
    }

    @Get('refresh')
    async refresh(@Req() req: Request) {
        const newTokens = await this.authService.refresh(req);
        return newTokens;
    }
}
