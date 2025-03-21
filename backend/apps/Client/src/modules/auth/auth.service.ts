import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

type AuthResult = {
  accessToken: string;
  expiresIn: string;
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
    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken, expiresIn: jwtConstants.expiresIn };
    } catch (error) {
      throw new Error('JWT ERROR: ', error);
    }
  }
}
