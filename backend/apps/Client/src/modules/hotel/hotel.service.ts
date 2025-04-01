import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class HotelService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    search: string | undefined,
    limit: number | undefined = 10,
    offset: number | undefined = 0,
  ) {
    try {
      const [hotels, total] = await Promise.all([
        this.prisma.hotel.findMany({
          select: {
            id: true,
            name: true,
            location: true,
            phoneNumber: true,
            image: true,
          },
          where: {
            OR: [
              { location: { contains: search || '', mode: 'insensitive' } },
              { name: { contains: search || '', mode: 'insensitive' } },
            ],
          },
          take: limit,
          skip: offset,
        }),
        this.prisma.hotel.count(),
      ]);
      return new FindAllDto(hotels, limit, offset, total);
    } catch (error) {
      throw new Error('Error occurred' + error);
    }
  }
}
