import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FindHotelDto } from './dto/find-all-hotel.dto';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  // create() {
  //   return this.hotelService.createHotelOwner();
  // }
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  findAll(@Query() findAllHotelDto: FindHotelDto) {
    return this.hotelService.findAll(findAllHotelDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
