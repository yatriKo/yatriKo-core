import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingHotelDto {
  @IsNotEmpty()
  dateFrom: string;

  @IsNotEmpty()
  dateTo: string;

  @IsNotEmpty()
  @IsInt()
  roomId: number;
}
