import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FindHotelDto } from './dto/find-all-hotel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

@Controller('hotel')
@UseGuards(AuthGuard, RolesGuard)
@Roles('HotelOwner')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // creating the hotel
  @Post()
  async create(@Body() CreateHotelDto: CreateHotelDto, @Request() req) {
    return this.hotelService.create(CreateHotelDto, req.user.sub);
  }

  // posting the hotel image on cloudinary
  @Post('/hotel-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadHotelImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(file.buffer);

    return { url: uploadedImage.secure_url };
  }

  // posting the room image on cloudinary
  @Post('/room-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(file.buffer);

    return { url: uploadedImage.secure_url };
  }

  // Fetching all the hotels owned by the user
  @Get()
  findAll(@Query() findAllHotelDto: FindHotelDto, @Request() req) {
    return this.hotelService.findAll(findAllHotelDto, req.user.sub);
  }

  // Fetching the particular hotel owned by the user
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(+id);
  }

  // Updating the hotel detail
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(+id, updateHotelDto);
  }

  // Deleting the hotel
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
