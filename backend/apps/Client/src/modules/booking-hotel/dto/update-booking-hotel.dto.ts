import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingHotelDto } from './create-booking-hotel.dto';

export class UpdateBookingHotelDto extends PartialType(CreateBookingHotelDto) {}
