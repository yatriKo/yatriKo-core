import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { FindHotelDto } from './dto/find-all-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class HotelService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createHotelDto: CreateHotelDto, id: number) {
    const { location, name, hotelImage, phoneNumber, roomType } =
      createHotelDto;

    const hotel = await this.prismaService.hotel.create({
      data: {
        name,
        dashboardUserId: id,
        location,
        phoneNumber,
        image: hotelImage,
        rooms: {
          create: roomType.flatMap((room) =>
            Array.from({ length: room.numberOfRoom }, () => ({
              roomType: room.type,
              price: room.price,
              roomImage: room.roomImage,
            })),
          ),
        },
      },
      include: {
        rooms: true,
      },
    });

    return hotel;
  }

  async findAll(findAllHotelDto: FindHotelDto, id: number) {
    const { name, location, price, roomType } = findAllHotelDto;

    const hotels = this.prismaService.hotel.findMany({
      where: {
        dashboardUserId: id,
        name,
        location,
        rooms: {
          some: {
            ...(price !== undefined ? { price: { lte: Number(price) } } : {}),
            ...(roomType ? { roomType } : {}),
          },
        },
      },
      include: {
        rooms: true,
      },
      omit: {
        image: true,
      },
    });

    return hotels;
  }

  async findOne(id: number) {
    const hotel = await this.prismaService.hotel.findUnique({
      where: {
        id,
      },
      include: {
        rooms: true,
      },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }

    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const { location, phoneNumber, name, roomType, hotelImage } =
      updateHotelDto;

    const hotel = await this.prismaService.hotel.update({
      where: { id },
      data: {
        dashboardUserId: 1,
        name,
        location,
        phoneNumber,
        image: hotelImage,
        rooms: {
          create: roomType.flatMap((room) =>
            Array.from({ length: room.numberOfRoom }, () => ({
              roomType: room.type,
              price: room.price,
              image: room.roomImage,
            })),
          ),
        },
      },
      include: {
        rooms: true,
      },
    });

    return hotel;
  }

  remove(id: number) {
    return this.prismaService.hotel.delete({
      where: { id },
    });
  }
}
