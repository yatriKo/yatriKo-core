import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('hotel/:hotelId/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getAvailableRooms(
    @Param('hotelId') hotelId: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    if (!from || !to) {
      return new BadRequestException('From date and to date required');
    }

    return this.roomsService.getAvailableRooms(hotelId, from, to);
  }
}
