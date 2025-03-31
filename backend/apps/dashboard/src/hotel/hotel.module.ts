import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { CloudinaryService } from '../cloudinary.service';

@Module({
  controllers: [HotelController],
  providers: [HotelService, CloudinaryService],
})
export class HotelModule {}
