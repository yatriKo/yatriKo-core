import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { CloudinaryService } from '../cloudinary.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [HotelController],
  providers: [HotelService, CloudinaryService],
})
export class HotelModule {}
