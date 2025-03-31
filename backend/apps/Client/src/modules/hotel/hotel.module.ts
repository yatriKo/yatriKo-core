import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { PrismaModule } from 'apps/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HotelService],
  controllers: [HotelController],
})
export class HotelModule {}
