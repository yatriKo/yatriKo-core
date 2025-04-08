import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class SeatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableSeats(busId: number) {
    const busSeats = await this.prisma.busSeat.findMany({
      where: { busId, bookings: { none: {} } },
    });
    return busSeats;
  }
}
