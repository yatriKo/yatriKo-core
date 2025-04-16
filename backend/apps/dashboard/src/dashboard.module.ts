import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { HotelModule } from './hotel/hotel.module';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { BookingHotelModule } from '../../Client/src/modules/booking-hotel/booking-hotel.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BusModule } from './bus/bus.module';
import config from '../../config/config';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    HotelModule,
    PrismaModule,
    BookingHotelModule,
    MulterModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    BusModule,
    BookingModule,
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    CloudinaryService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class DashboardModule {}
