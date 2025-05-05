import { Injectable } from '@nestjs/common';
import { CreateBookingHotelDto } from './dto/create-booking-hotel.dto';
import { UpdateBookingHotelDto } from './dto/update-booking-hotel.dto';
import { PrismaService } from 'apps/prisma/prisma.service';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@Injectable()
export class BookingHotelService {
  constructor(private readonly prismaService: PrismaService) {}

  //async function to crerate book hotel
  async create(createBookingHotelDto: CreateBookingHotelDto, id: number) {
    const { dateFrom, dateTo, roomId, clientEmail, clientName } =
      createBookingHotelDto;

    return await this.prismaService.bookingHotel.create({
      data: {
        userId: id,
        dateFrom: dayjs(dateFrom, 'DD/MM/YYYY').toDate(),
        dateTo: dayjs(dateTo, 'DD/MM/YYYY').toDate(),
        paymentStatus: true,
        roomId,
        clientEmail,
        clientName,
      },
    });
  }

  async findAll(id: number) {
    return await this.prismaService.bookingHotel.findMany({
      where: { userId: id },
      include: {
        room: {
          include: {
            hotel: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingHotel`;
  }

  update(id: number, updateBookingHotelDto: UpdateBookingHotelDto) {
    return `This action updates a #${id} bookingHotel`;
  }

  async remove(id: number) {
    return await this.prismaService.bookingHotel.delete({
      where: { id },
    });
  }
}
