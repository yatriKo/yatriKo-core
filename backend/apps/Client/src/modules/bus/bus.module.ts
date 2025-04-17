import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { PrismaModule } from 'apps/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusService],
  controllers: [BusController],
})
export class BusModule {}
