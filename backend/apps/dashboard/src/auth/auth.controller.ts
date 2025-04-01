import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/dashboard-login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
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

  @UseGuards(RolesGuard)
  @Roles('BusOwner')
  @Get('hello')
  hello() {
    return 'Hello received';
  }
}
