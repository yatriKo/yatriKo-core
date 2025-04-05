import { BadRequestException, Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'apps/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAvailableRooms(hotelId: number, from: string, to: string) {
    if (
      !dayjs(from, 'DD/MM/YYYY').isValid() ||
      !dayjs(to, 'DD/MM/YYYY').isValid()
    ) {
      throw new BadRequestException('Date should be in format DD/MM/YYYY');
    }
    const fromDateObj = dayjs(from, 'DD/MM/YYYY').toDate();
    const toDateObj = dayjs(to, 'DD/MM/YYYY').toDate();
    const hotelRooms = await this.prisma.room.findMany({
      where: { hotelId },
      include: { bookings: true },
    });
    const filteredRooms: Room[] = [];
    for (let i = 0; i < hotelRooms.length; i++) {
      const { bookings, ...room } = hotelRooms[i];
      if (bookings.length === 0) {
        filteredRooms.push(room);
        continue;
      }
      const overlaps = bookings.filter((booking) => {
        return booking.dateFrom < toDateObj && booking.dateTo > fromDateObj;
      });

      if (overlaps.length === 0) filteredRooms.push(room);
    }

    return filteredRooms;
  }
}
