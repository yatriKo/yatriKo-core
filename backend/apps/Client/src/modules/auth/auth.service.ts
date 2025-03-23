import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, pass: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch: boolean = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    try {
      const token = await this.jwtService.signAsync(payload);
      const accessToken = 'Bearer ' + token;
      return { accessToken, expiresIn: jwtConstants.expiresIn };
    } catch (error) {
      throw new Error('JWT ERROR: ', error);
    }
  }

  async signUp(userDetails: CreateUserDto) {
    const usercheck = await this.usersService.findOne(userDetails.email);
    if (usercheck)
      throw new BadRequestException(
        'User with this email address already exists',
      );
    const hashedPassword = await bcrypt.hash(
      userDetails.password,
      Number(process.env.BCRYPT_SALT),
    );
    const user = await this.usersService.createUser({
      ...userDetails,
      password: hashedPassword,
    });
    return instanceToPlain(new UserResponseDto(user));
  }
}
