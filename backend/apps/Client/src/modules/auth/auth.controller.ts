import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
  logIn(@Body() logInData: UserLogInDto) {
    return this.authService.logIn(logInData.email, logInData.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpData: CreateUserDto) {
    return this.authService.signUp(signUpData);
  }
}
