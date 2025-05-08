import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { Roles } from '../roles/roles.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @Roles('Admin')
  counts() {
    return this.statsService.countUserData();
  }
}
