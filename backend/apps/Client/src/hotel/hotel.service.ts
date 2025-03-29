import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class HotelService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(
    search: string | undefined,
    limit: number | undefined,
    offset: number | undefined,
  ) {
    throw new Error('Method not implemented.');
  }
}
