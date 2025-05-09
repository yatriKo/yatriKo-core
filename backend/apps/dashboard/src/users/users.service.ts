import { Injectable } from '@nestjs/common';
import { ClientRole, dashboardUser, Role } from '@prisma/client';
import { PrismaService } from 'apps/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserClientDto } from './dto/user-client.dto';
import { UserDashboardDto } from './dto/user-dashboard.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string): Promise<dashboardUser | null> {
    const user = await this.prisma.dashboardUser.findUnique({
      where: { email: email },
    });
    return user;
  }

  async createUser(userDetails: CreateUserDto): Promise<dashboardUser> {
    const user = await this.prisma.dashboardUser.create({
      data: userDetails,
    });
    return user;
  }

  async findTravelers(): Promise<UserClientDto[]> {
    const users = await this.prisma.user.findMany({
      where: { role: ClientRole.User },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        _count: {
          select: { busBookings: true, hotelBookings: true },
        },
      },
    });
    return users;
  }

  async findTravelAgents(): Promise<UserClientDto[]> {
    const users = await this.prisma.user.findMany({
      where: { role: ClientRole.TravelAgent },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        _count: {
          select: { busBookings: true, hotelBookings: true },
        },
      },
    });
    return users;
  }

  async findHotelOwners(): Promise<UserDashboardDto[]> {
    const users = await this.prisma.dashboardUser.findMany({
      where: { role: Role.HotelOwner },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: { hotels: true },
        },
      },
    });
    return users;
  }
  async findBusOwners() {
    const users = await this.prisma.dashboardUser.findMany({
      where: { role: Role.BusOwner },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: { buses: true },
        },
      },
    });
    return users;
  }
}
