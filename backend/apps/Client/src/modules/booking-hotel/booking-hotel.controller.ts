import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { BookingHotelService } from './booking-hotel.service';
import { CreateBookingHotelDto } from './dto/create-booking-hotel.dto';
import { UpdateBookingHotelDto } from './dto/update-booking-hotel.dto';

@Controller('booking-hotel')
export class BookingHotelController {
  constructor(private readonly bookingHotelService: BookingHotelService) {}

  @Post()
  create(@Body() createBookingHotelDto: CreateBookingHotelDto) {
    return this.bookingHotelService.create(createBookingHotelDto);
  }

  @Get()
  findAll() {
    return this.bookingHotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingHotelService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookingHotelDto: UpdateBookingHotelDto,
  ) {
    return this.bookingHotelService.update(+id, updateBookingHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingHotelService.remove(+id);
  }
}
