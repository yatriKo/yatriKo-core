import { Injectable } from '@nestjs/common';
import { Hotel } from '@prisma/client';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class HotelService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    search: string | undefined,
    limit: number | undefined = 10,
    offset: number | undefined = 0,
  ) {
    try {
      const hotels: Hotel[] = await this.prisma.hotel.findMany({
        where: { location: { contains: search || '', mode: 'insensitive' } },
        take: limit,
        skip: offset,
      });
      return hotels;
    } catch (error) {
      throw new Error('Error occurred' + error);
    }
  }
}
