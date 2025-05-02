import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelOwnerService } from './hotel-owner.service';
import { CreateHotelOwnerDto } from './dto/create-hotel-owner.dto';
import { UpdateHotelOwnerDto } from './dto/update-hotel-owner.dto';

@Controller('hotel-owner')
export class HotelOwnerController {
  constructor(private readonly hotelOwnerService: HotelOwnerService) {}

  @Get()
  findAll() {
    return this.hotelOwnerService.findAllHotelOwner();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelOwnerService.remove(+id);
  }
}
