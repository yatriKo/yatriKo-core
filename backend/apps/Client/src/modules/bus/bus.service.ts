import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';
import { FindAllDto } from '../hotel/dto/find-all.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class BusService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    const bus = await this.prisma.bus.findUnique({
      where: { id },
      omit: { dashboardUserId: true },
    });
    if (!bus) throw new NotFoundException('Bus not found');
    return bus;
  }

  async findAll(
    search: string | undefined,
    date?: string,
    limit: number | undefined = 10,
    offset: number | undefined = 0,
  ) {
    if (date && !dayjs(date).isValid()) throw new BadRequestException();
    try {
      const dateFilter = date
        ? {
            gte: dayjs(date).startOf('day').toDate(),
            lte: dayjs(date).endOf('day').toDate(),
          }
        : undefined;

      const [buses, total] = await Promise.all([
        this.prisma.bus.findMany({
          select: {
            id: true,
            busNumber: true,
            from: true,
            to: true,
            date: true,
            phoneNumber: true,
            image: true,
          },
          where: {
            OR: [
              { from: { contains: search || '' } },
              { to: { contains: search || '' } },
            ],
            ...(date ? { date: dateFilter } : {}),
          },
          take: limit,
          skip: offset,
        }),
        this.prisma.hotel.count(),
      ]);
      return new FindAllDto(buses, limit, offset, total);
    } catch (error) {
      throw new Error('Error occurred' + error);
    }
  }
}
