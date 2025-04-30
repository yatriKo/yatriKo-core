import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { instanceToPlain } from 'class-transformer';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserLogInDto } from './dto/login.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(LogInDto: UserLogInDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(LogInDto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch: boolean = await bcrypt.compare(
      LogInDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    try {
      const token = await this.jwtService.signAsync(payload);
      const accessToken = 'Bearer ' + token;
      return { accessToken, expiresIn: '7d' };
    } catch (error) {
      throw new Error('JWT ERROR: ' + error);
    }
  }

  async signUp(userDetails: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        userDetails.password,
        Number(process.env.BCRYPT_SALT),
      );
      const user = await this.usersService.createUser({
        ...userDetails,
        password: hashedPassword,
      });
      return instanceToPlain(new UserResponseDto(user));
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'User with this email address already exists',
        );
      }
      throw error;
    }
  }
}
