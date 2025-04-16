import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
  }

  async findAllHotelBookings(dashboardUserId: number) {
    return await this.prismaService.bookingHotel.findMany({
      where: {
        room: {
          hotel: {
            dashboardUserId: dashboardUserId,
          },
        },
      },
      include: {
        room: {
          include: {
            hotel: true,
          },
        },
        user: true,
        travelerAgent: true,
      },
    });
  }

  async findAllBusBookings(dashboardUserId: number) {
    return await this.prismaService.bookingBus.findMany({
      where: {
        BusSeat: {
          bus: {
            dashboardUserId: dashboardUserId,
          },
        },
      },
      include: {
        BusSeat: {
          include: {
            bus: true,
          },
        },
        user: true,
        travelerAgent: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return this.prismaService.bookingHotel.delete({
      where: { id },
    });
  }

  removeBus(id: number) {
    return this.prismaService.bookingBus.delete({
      where: { id },
    });
  }
}
