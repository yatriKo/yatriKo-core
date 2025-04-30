import { Role } from '@prisma/client';

export class LoginResponseDto {
  accessToken: string;
  expiresIn: string;
  role: Role;
}
