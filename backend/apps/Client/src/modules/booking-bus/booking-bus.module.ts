import { Module } from '@nestjs/common';
import { BookingBusService } from './booking-bus.service';
import { BookingBusController } from './booking-bus.controller';

@Module({
  providers: [BookingBusService],
  controllers: [BookingBusController]
})
export class BookingBusModule {}
