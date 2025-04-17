import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingBusDto } from './dto/create-booking-bus.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class BookingBusService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(id: number) {
    return this.prisma.bookingBus.findMany({
      where: { userId: id },
      include: {
        BusSeat: {
          include: {
            bus: true,
          },
        },
      },
    });
  }
  async create(createBookingBusDto: CreateBookingBusDto, id: number) {
    const { busSeatId } = createBookingBusDto;
    const bus = await this.prisma.busSeat.findUnique({
      where: { id: busSeatId },
      select: { bus: true },
    });
    if (!bus) throw new BadRequestException('Bus not found');
    return await this.prisma.bookingBus.create({
      data: { busSeatId, paymentStatus: true, userId: id, date: bus.bus.date },
    });
  }
}
