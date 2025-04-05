import { Module } from '@nestjs/common';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [PrismaModule],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
