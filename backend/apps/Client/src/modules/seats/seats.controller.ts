import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('bus/:busId/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get()
  getAvailableSeats(@Param('busId') busId: number) {
    return this.seatsService.getAvailableSeats(busId);
  }
}
