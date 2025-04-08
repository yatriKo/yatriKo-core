import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookingBusService } from './booking-bus.service';
import { CreateBookingBusDto } from './dto/create-booking-bus.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('booking-bus')
export class BookingBusController {
  constructor(private readonly bookingBusService: BookingBusService) {}

  @Post()
  create(@Body() createBookingBusDto: CreateBookingBusDto, @Request() req) {
    return this.bookingBusService.create(createBookingBusDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req) {
    return this.bookingBusService.findAll(req.user.sub);
  }
}
