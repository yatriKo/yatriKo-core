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

  async create(createBookingHotelDto: CreateBookingHotelDto, id: number) {
    const { dateFrom, dateTo, roomId } = createBookingHotelDto;

    return await this.prismaService.bookingHotel.create({
      data: {
        userId: id,
        dateFrom: dayjs(dateFrom, 'DD/MM/YYYY').toDate(),
        dateTo: dayjs(dateTo, 'DD/MM/YYYY').toDate(),
        paymentStatus: true,
        roomId,
      },
    });
  }

  findAll() {
    return `This action returns all bookingHotel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingHotel`;
  }

  update(id: number, updateBookingHotelDto: UpdateBookingHotelDto) {
    return `This action updates a #${id} bookingHotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingHotel`;
  }
}
