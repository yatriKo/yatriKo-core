import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

type AuthResult = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, pass: string): Promise<AuthResult> {
    const user = await this.usersService.findOne(email);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
