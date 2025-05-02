import { Module } from '@nestjs/common';
import { HotelOwnerService } from './hotel-owner.service';
import { HotelOwnerController } from './hotel-owner.controller';

@Module({
  controllers: [HotelOwnerController],
  providers: [HotelOwnerService],
})
export class HotelOwnerModule {}
