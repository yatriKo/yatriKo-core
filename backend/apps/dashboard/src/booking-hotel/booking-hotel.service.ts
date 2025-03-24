import { Injectable } from '@nestjs/common';
import { CreateBookingHotelDto } from './dto/create-booking-hotel.dto';
import { UpdateBookingHotelDto } from './dto/update-booking-hotel.dto';

@Injectable()
export class BookingHotelService {
  create(createBookingHotelDto: CreateBookingHotelDto) {
    return 'This action adds a new bookingHotel';
  }

  findAll() {
    return `This action returns all bookingHotel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingHotel`;
  }

  update(id: number, updateBookingHotelDto: UpdateBookingHotelDto) {
    return `This action updates a #${id} bookingHotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingHotel`;
  }
}
