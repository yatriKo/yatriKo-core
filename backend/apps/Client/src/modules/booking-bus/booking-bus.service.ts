import { Injectable } from '@nestjs/common';
import { CreateBookingBusDto } from './dto/create-booking-bus.dto';

@Injectable()
export class BookingBusService {
  create(createBookingBusDto: CreateBookingBusDto, sub: any) {
    throw new Error('Method not implemented.');
  }
}
