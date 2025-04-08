import { Controller, Get, Query } from '@nestjs/common';
import { BusService } from './bus.service';

@Controller('bus')
export class BusController {
  constructor(private busService: BusService) {}

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('date') date?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.busService.findAll(search, date, limit, offset);
  }

  @Get(':id')
  findOne(@Query(':id') id: number) {
    return this.busService.findOne(id);
  }
}
