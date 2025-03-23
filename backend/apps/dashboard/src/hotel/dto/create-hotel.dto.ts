import { IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateHotelDto {
  location: string;
  phoneNumber: number;
  @IsArray()
  @ArrayNotEmpty({ message: 'Room types should not be empty' })
  roomType: { type: string; price: number; numberOfRoom: number }[];
}
