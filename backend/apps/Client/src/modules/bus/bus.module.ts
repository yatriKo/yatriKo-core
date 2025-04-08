import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';

@Module({
  providers: [BusService],
  controllers: [BusController]
})
export class BusModule {}
