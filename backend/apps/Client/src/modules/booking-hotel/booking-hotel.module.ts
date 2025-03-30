import { Module } from '@nestjs/common';
import { BookingHotelService } from './booking-hotel.service';
import { BookingHotelController } from './booking-hotel.controller';

@Module({
  controllers: [BookingHotelController],
  providers: [BookingHotelService],
})
export class BookingHotelModule {}
