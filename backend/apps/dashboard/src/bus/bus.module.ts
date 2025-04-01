import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { CloudinaryService } from '../cloudinary.service';

@Module({
  controllers: [BusController],
  providers: [BusService, CloudinaryService],
})
export class BusModule {}
