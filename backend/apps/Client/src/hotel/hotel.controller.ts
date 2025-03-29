import { Controller, Get, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get('')
  findAll(
    @Query('search') search?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.hotelService.findAll(search, limit, offset);
  }
}
