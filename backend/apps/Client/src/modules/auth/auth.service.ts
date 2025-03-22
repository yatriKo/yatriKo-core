import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

type AuthResult = {
  accessToken: string;
  expiresIn: string;
};

export type JwtPayload = {
  sub: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, pass: string): Promise<AuthResult> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    try {
      const isMatch: boolean = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) throw UnauthorizedException;
      throw new Error('BCRYPT PASSWORD MATCH ERROR: ', error);
    }

    const payload: JwtPayload = { sub: user.id, username: user.email };

    try {
      const token = await this.jwtService.signAsync(payload);
      const accessToken = 'Bearer ' + token;
      return { accessToken, expiresIn: jwtConstants.expiresIn };
    } catch (error) {
      throw new Error('JWT ERROR: ', error);
    }
  }
}
