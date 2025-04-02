import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingHotelService } from './booking-hotel.service';
import { CreateBookingHotelDto } from './dto/create-booking-hotel.dto';
import { UpdateBookingHotelDto } from './dto/update-booking-hotel.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('booking-hotel')
@UseGuards(AuthGuard)
export class BookingHotelController {
  constructor(private readonly bookingHotelService: BookingHotelService) {}

  @Post()
  create(@Body() createBookingHotelDto: CreateBookingHotelDto, @Request() req) {
    return this.bookingHotelService.create(createBookingHotelDto, req.user.sub);
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
