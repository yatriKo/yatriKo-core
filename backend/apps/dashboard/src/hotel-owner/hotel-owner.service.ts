import { Injectable } from '@nestjs/common';
import { CreateHotelOwnerDto } from './dto/create-hotel-owner.dto';
import { UpdateHotelOwnerDto } from './dto/update-hotel-owner.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class HotelOwnerService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllHotelOwner() {
    return this.prismaService.dashboardUser.findMany({
      where: { role: 'HotelOwner' },
    });
  }

  remove(id: number) {
    return this.prismaService.dashboardUser.delete({
      where: { id },
    });
  }
}
