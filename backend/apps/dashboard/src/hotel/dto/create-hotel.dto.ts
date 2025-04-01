import { IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  hotelImage: string[];
  @IsArray()
  @ArrayNotEmpty({ message: 'Room types should not be empty' })
  roomType: {
    type: string;
    price: number;
    numberOfRoom: number;
    roomImage: string[];
  }[];
}
