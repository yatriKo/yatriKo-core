import { Injectable } from '@nestjs/common';
import { dashboardUser } from '@prisma/client';
import { PrismaService } from 'apps/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
