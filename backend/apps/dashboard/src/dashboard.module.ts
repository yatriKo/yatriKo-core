import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { HotelModule } from './hotel/hotel.module';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { BookingHotelModule } from './booking-hotel/booking-hotel.module';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from '../../config/config';

@Module({
  imports: [
    HotelModule,
    PrismaModule,
    BookingHotelModule,
    MulterModule,
    // UsersModule,
    // AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, CloudinaryService],
})
export class DashboardModule {}
