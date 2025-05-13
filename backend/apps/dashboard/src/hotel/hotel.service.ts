import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { FindHotelDto } from './dto/find-all-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class HotelService {
  // declaring PrismaService in constructor so that all function inside can use the PrismaService
  constructor(private readonly prismaService: PrismaService) {}

  //async function to crerate hotel
  async create(createHotelDto: CreateHotelDto, id: number) {
    // destructuring all the infos
    const { location, name, hotelImage, phoneNumber, roomType } =
      createHotelDto;

    // using prisma to fetch the hotel detail
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

    //returning the data fetched
    return hotel;
  }

  // Finding all the hotel of the dashboard user who is logged in
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

  // showcasing the particular hotel
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

  // updating the hotel info
  async update(hotelId: number, updateHotelDto: UpdateHotelDto, id: number) {
    const { location, name, hotelImage, phoneNumber, roomType } =
      updateHotelDto;

    await this.prismaService.hotel.deleteMany({
      where: { id: hotelId },
    });

    // using prisma to fetch the hotel detail
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

    //returning the data fetched
    return hotel;
  }

  // deletes the hotel
  remove(id: number) {
    return this.prismaService.hotel.delete({
      where: { id },
    });
  }
}
