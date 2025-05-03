import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'apps/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }

  async createUser(userDetails: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({ data: userDetails });
    return user;
  }
}
