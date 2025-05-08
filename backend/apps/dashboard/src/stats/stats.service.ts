import { Injectable } from '@nestjs/common';
import { ClientRole, Role } from '@prisma/client';
import { PrismaService } from 'apps/prisma/prisma.service';
import { UserStatsDto } from './dto/user-stats.dto';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async countUserData(): Promise<UserStatsDto> {
    const [travelerCount, travelAgentCount, busOwnerCount, HotelOwnerCount] =
      await Promise.all([
        this.prisma.user.count({ where: { role: ClientRole.User } }),
        this.prisma.user.count({ where: { role: ClientRole.TravelAgent } }),
        this.prisma.dashboardUser.count({ where: { role: Role.BusOwner } }),
        this.prisma.dashboardUser.count({ where: { role: Role.HotelOwner } }),
      ]);
    return { travelerCount, travelAgentCount, busOwnerCount, HotelOwnerCount };
  }
}
