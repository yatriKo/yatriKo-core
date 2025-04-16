import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get('/hotel')
  findAll(@Request() req) {
    return this.bookingService.findAllHotelBookings(req.user.sub);
  }

  @Get('/bus')
  findAllBusBookings(@Request() req) {
    return this.bookingService.findAllBusBookings(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete('/hotel:id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  @Delete('/bus:id')
  removeBus(@Param('id') id: string) {
    return this.bookingService.removeBus(+id);
  }
}
