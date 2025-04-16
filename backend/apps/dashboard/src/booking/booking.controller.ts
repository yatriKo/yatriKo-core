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

  // getting all the info about the booking of the hotel
  @Get('/hotel')
  findAll(@Request() req) {
    return this.bookingService.findAllHotelBookings(req.user.sub);
  }

  // getting all the info about the booking of the bus
  @Get('/bus')
  findAllBusBookings(@Request() req) {
    return this.bookingService.findAllBusBookings(req.user.sub);
  }

  // deleting the booking
  @Delete('/hotel:id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  // deleting the booking
  @Delete('/bus:id')
  removeBus(@Param('id') id: string) {
    return this.bookingService.removeBus(+id);
  }
}
