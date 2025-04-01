import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { PrismaService } from 'apps/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { FindBusDto } from './dto/find-all-bus.dto';

@Injectable()
export class BusService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBusDto: CreateBusDto, id: number) {
    const { busNumber, busSeats, date, from, image, phoneNumber, to } =
      createBusDto;
    const createdBus = await this.prismaService.bus.create({
      data: {
        busNumber,
        date: dayjs(date, 'DD/MM/YYYY').toDate(),
        from,
        to,
        image,
        phoneNumber,
        dashboardUserId: id,
        busSeats: {
          create: busSeats.flatMap((seat) =>
            Array.from({ length: seat.numberOfSeats }, () => ({
              seatType: seat.seatType,
              price: seat.price,
            })),
          ),
        },
      },
      include: {
        busSeats: true,
      },
    });

    return createdBus;
  }

  async findAll(findBusDto: FindBusDto, userId: number) {
    const { dateFrom, dateTo, from, price, to } = findBusDto;

    const startDate = dateFrom
      ? dayjs(dateFrom, 'DD/MM/YYYY').startOf('day').toDate()
      : undefined;
    const endDate = dateTo
      ? dayjs(dateTo, 'DD/MM/YYYY').endOf('day').toDate()
      : undefined;

    return this.prismaService.bus.findMany({
      where: {
        dashboardUserId: userId,
        ...(from && { from }),
        ...(to && { to }),
        ...(dateFrom && {
          date: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
          },
        }),
        ...(price && {
          busSeats: {
            some: { price: { lte: Number(price) } },
          },
        }),
      },
      include: {
        busSeats: true,
      },
    });
  }

  async findOne(id: number) {
    const bus = await this.prismaService.bus.findUnique({
      where: {
        id: id,
      },
      include: {
        busSeats: true,
      },
    });

    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }

    return bus;
  }

  async update(id: number, updateBusDto: CreateBusDto) {
    const { busNumber, busSeats, date, from, image, to } = updateBusDto;

    const newBus = await this.prismaService.bus.update({
      where: { id },
      data: {
        busNumber,
        date: date ? dayjs(date, 'DD/MM/YYYY').toDate() : undefined,
        from,
        to,
        image,
        busSeats: {
          create: busSeats.flatMap((seat) =>
            Array.from({ length: seat.numberOfSeats }, () => ({
              seatType: seat.seatType,
              price: seat.price,
            })),
          ),
        },
      },
      include: {
        busSeats: true,
      },
    });

    return newBus;
  }

  async remove(id: number) {
    const existingBus = await this.prismaService.bus.findUnique({
      where: { id },
    });

    if (!existingBus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }

    return await this.prismaService.bus.delete({ where: { id } });
  }
}
