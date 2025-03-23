import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
