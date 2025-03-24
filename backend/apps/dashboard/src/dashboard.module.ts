import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { HotelModule } from './hotel/hotel.module';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { BookingHotelModule } from './booking-hotel/booking-hotel.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    HotelModule,
    PrismaModule,
    BookingHotelModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService, CloudinaryService],
})
export class DashboardModule {}
