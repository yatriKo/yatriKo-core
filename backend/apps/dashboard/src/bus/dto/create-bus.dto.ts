import { ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateBusDto {
  from: string;
  image: string[];
  to: string;
  date: string;
  busNumber: string;
  phoneNumber: string;
  @IsArray()
  @ArrayNotEmpty({ message: 'Seats should not be empty' })
  busSeats: {
    seatType: string;
    price: number;
    numberOfSeats: number;
  }[];
}
