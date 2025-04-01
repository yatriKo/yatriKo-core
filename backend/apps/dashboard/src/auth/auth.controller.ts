import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/dashboard-login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../roles/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() logInObject: LogInDto) {
    return this.authService.login(logInObject);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() signUpObject: CreateUserDto) {
    return this.authService.signUp(signUpObject);
  }
}
