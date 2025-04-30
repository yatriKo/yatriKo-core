import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingBusDto {
  @IsNotEmpty()
  @IsInt()
  busSeatId: number;
}
