import { Injectable } from '@nestjs/common';
import { CreateBusOwnerDto } from './dto/create-bus-owner.dto';
import { UpdateBusOwnerDto } from './dto/update-bus-owner.dto';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class BusOwnersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.dashboardUser.findMany({
      where: { role: 'BusOwner' },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} busOwner`;
  // }

  // update(id: number, updateBusOwnerDto: UpdateBusOwnerDto) {
  //   return `This action updates a #${id} busOwner`;
  // }

  remove(id: number) {
    return this.prismaService.dashboardUser.delete({
      where: { id },
    });
  }
}
