import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class SeatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableSeats(busId: number) {
    const bus = await this.prisma.bus.findUnique({
      where: { id: busId },
      select: { date: true },
    });
    if (!bus) throw new BadRequestException('Bus not found');

    const busSeats = await this.prisma.busSeat.findMany({
      where: {
        busId,
        bookings: {
          none: {
            date: {
              gte: new Date(bus.date.setHours(0, 0, 0, 0)),
              lte: new Date(bus.date.setHours(23, 59, 59, 999)),
            },
          },
        },
      },
    });
    return busSeats;
  }
}
