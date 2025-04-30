import { Module } from '@nestjs/common';
import { BookingBusService } from './booking-bus.service';
import { BookingBusController } from './booking-bus.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [BookingBusService],
  controllers: [BookingBusController],
})
export class BookingBusModule {}
