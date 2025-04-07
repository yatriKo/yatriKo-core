import { NestFactory } from '@nestjs/core';
import { DashboardModule } from './dashboard.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DashboardModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
