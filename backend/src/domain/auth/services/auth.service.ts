import { extractTokenFromHeader } from "@app/domain/auth/lib/extractTokenFromHeader";
import { HashService } from "@app/domain/auth/services/hash.service";
import { UserRepository } from "@app/domain/user/services/user.repository";
import { LoginSchema } from "dto";
import { Injectable, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HttpStatusCode } from "axios";
import { Request } from "express";
import { z } from "nestjs-zod/z";

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) {}

  async login({ email, password }: z.infer<typeof LoginSchema>) {
    const user = await this.userRepository.findByEmail({ email });

    if (!user)
      throw new HttpException("Invalid credentials", HttpStatusCode.Conflict);

    const isPasswordMatch = await this.hashService.compare(
      password,
      user.password
    );
    if (!isPasswordMatch)
      throw new HttpException("Invalid credentials", HttpStatusCode.Conflict);

    if (!user.verified)
      throw new HttpException(
        "Please, verify your account",
        HttpStatusCode.UpgradeRequired
      );

    const access = this.jwtService.sign(
      { sub: user.id, role: user.role },
      { expiresIn: "4m" }
    );
    const refresh = this.jwtService.sign(
      { sub: user.id, role: user.role },
      { expiresIn: "1d" }
    );

    return {
      tokens: {
        access,
        refresh,
      },
      user,
    };
  }

  async refresh(req: Request) {
    const token = req?.cookies["refresh"];
    const verified = await this.jwtService.verifyAsync(token);

    if (!verified)
      throw new HttpException("Invalid token", HttpStatusCode.Locked);

    const { sub, role } = verified;
    const access = this.jwtService.sign({ sub, role }, { expiresIn: "4m" });
    const refresh = this.jwtService.sign({ sub, role }, { expiresIn: "1d" });

    return {
      access,
      refresh,
    };
  }

  async checkSession(req: Request) {
    const bearer = extractTokenFromHeader(req);
    if (!bearer)
      throw new HttpException("Invalid token", HttpStatusCode.Locked);

    const { sub } = await this.jwtService.verifyAsync(bearer).catch(() => {
      throw new HttpException("Unauthorized", HttpStatusCode.Unauthorized);
    });

    const sessionUser = await this.userRepository.findById({
      id: sub,
      select: {
        email: true,
        id: true,
        name: true,
        notificationProvider: true,
        phoneNumber: true,
        role: true,
        surname: true,
        verified: true,
      },
    });

    if (!sessionUser)
      throw new HttpException("Unauthorized", HttpStatusCode.Locked);

    return {
      user: sessionUser,
    };
  }
}
