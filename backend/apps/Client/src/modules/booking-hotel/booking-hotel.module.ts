import { Module } from '@nestjs/common';
import { BookingHotelService } from './booking-hotel.service';
import { BookingHotelController } from './booking-hotel.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BookingHotelController],
  providers: [BookingHotelService],
})
export class BookingHotelModule {}
