import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/dashboard-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { bcryptConstants, jwtConstants } from './constants';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponseDto } from './dto/create-user-response.dto';
import { instanceToPlain } from 'class-transformer';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(logInObject: LogInDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(logInObject.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(logInObject.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    try {
      const token = await this.jwtService.signAsync(payload);
      const accessToken = 'Bearer ' + token;
      return {
        accessToken,
        expiresIn: jwtConstants.expiresIn,
        role: user.role,
      };
    } catch (error) {
      throw new Error('JWT ERROR: ' + error);
    }
  }

  async signUp(signUpObject: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        signUpObject.password,
        bcryptConstants.salt,
      );
      const user = await this.usersService.createUser({
        ...signUpObject,
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
