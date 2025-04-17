import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from 'apps/config/config';
import { HotelModule } from './modules/hotel/hotel.module';
import { BookingHotelModule } from './modules/booking-hotel/booking-hotel.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { BusModule } from './modules/bus/bus.module';
import { SeatsModule } from './modules/seats/seats.module';
import { BookingBusModule } from './modules/booking-bus/booking-bus.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HotelModule,
    BookingHotelModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    BusModule,
    RoomsModule,
    SeatsModule,
    BookingBusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
