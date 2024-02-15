import { LoginSchema, SignUpSchema, VerificationSchema } from 'dto';
import { createZodDto } from 'nestjs-zod';

export class LoginDto extends createZodDto(LoginSchema) {}
export class SignUpDto extends createZodDto(SignUpSchema) {}
export class VerificationDto extends createZodDto(VerificationSchema) {}
