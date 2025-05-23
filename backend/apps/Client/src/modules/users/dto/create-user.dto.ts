import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';
import { ClientRole } from '@prisma/client';

export class CreateUserDto {
  @MinLength(2, { message: 'Name must be atleast 2 characters' })
  @IsNotEmpty({ message: 'Name is required}' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email must be a valid email address' })
  email: string;

  @MinLength(7, { message: 'Phone number must be at least 7 digits' })
  @IsNumberString({}, { message: 'Phone number must be numeric' })
  phoneNumber: string;

  @IsString()
  @MinLength(6, { message: 'Phone number must be at least 6 characters' })
  password: string;

  @IsString()
  @IsEnum(ClientRole, {
    message: 'Role should be one of "User" or "TravelAgent',
  })
  role: ClientRole;
}
