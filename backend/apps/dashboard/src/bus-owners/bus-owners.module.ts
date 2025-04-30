import { Module } from '@nestjs/common';
import { BusOwnersService } from './bus-owners.service';
import { BusOwnersController } from './bus-owners.controller';

@Module({
  controllers: [BusOwnersController],
  providers: [BusOwnersService],
})
export class BusOwnersModule {}
