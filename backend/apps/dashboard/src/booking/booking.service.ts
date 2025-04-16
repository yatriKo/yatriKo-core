import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}
  //finds all the hotels of the dashboard user's thats been booked
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
  //finds all the buses of the dashboard user's thats been booked
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

  // deletes the hotel thats booked
  remove(id: number) {
    return this.prismaService.bookingHotel.delete({
      where: { id },
    });
  }
  // deletes the bus thats booked
  removeBus(id: number) {
    return this.prismaService.bookingBus.delete({
      where: { id },
    });
  }
}
