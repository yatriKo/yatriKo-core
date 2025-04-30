import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @MinLength(2, { message: 'Name must be atleast 2 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;

  @IsEnum(Role, { message: 'Role must be `Admin`, `HotelOwner` or `BusOwner`' })
  @IsNotEmpty({ message: 'Role must be `Admin`, `HotelOwner` or `BusOwner`' })
  role: Role;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
