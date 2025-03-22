import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService, JwtPayload } from './auth.service';
import { IsEmail, IsString } from 'class-validator';
import { AuthGuard } from './auth.guard';

class UserLogInDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: UserLogInDto) {
    return this.authService.logIn(logInDto.email, logInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): JwtPayload {
    return req.user;
  }
}
