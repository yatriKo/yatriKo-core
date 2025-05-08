import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateBookingHotelDto {
  @IsNotEmpty()
  dateFrom: string;

  @IsNotEmpty()
  dateTo: string;

  @IsNotEmpty()
  @IsInt()
  roomId: number;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  clientEmail?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  paymentStatus?: boolean;
}
