import { Module } from '@nestjs/common';
import { PrismaService } from '~/infrastructure/db/prisma.service';
import { UserRepository } from '~/domain/user/services/user.repository';

@Module({
  providers: [PrismaService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
