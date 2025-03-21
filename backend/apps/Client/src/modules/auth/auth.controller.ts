import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class UserLogInDto {
  readonly email: string;
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
}
