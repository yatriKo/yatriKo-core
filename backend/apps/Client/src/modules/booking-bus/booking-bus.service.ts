import { Injectable } from '@nestjs/common';
import { CreateBookingBusDto } from './dto/create-booking-bus.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class BookingBusService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(id: number) {
    return this.prisma.bookingBus.findMany({
      where: { userId: id },
    });
  }
  create(createBookingBusDto: CreateBookingBusDto, sub: any) {
    throw new Error('Method not implemented.');
  }
}
