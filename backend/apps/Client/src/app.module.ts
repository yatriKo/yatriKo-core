import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [PrismaModule, AuthModule, HotelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
