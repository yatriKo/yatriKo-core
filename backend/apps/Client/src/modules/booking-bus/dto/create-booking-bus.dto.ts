import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingBusDto {
  @IsNotEmpty()
  @IsInt()
  busSeatId: number;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  clientEmail?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  paymentStatus?: boolean;
}
