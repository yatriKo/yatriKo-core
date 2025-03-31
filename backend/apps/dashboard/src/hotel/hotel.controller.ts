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

@Controller('hotel')
@UseGuards(AuthGuard)
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  // create() {
  //   return this.hotelService.createHotelOwner();
  // }
  //
  async create(@Body() CreateHotelDto: CreateHotelDto, @Request() req) {
    return this.hotelService.create(CreateHotelDto, req.user.sub);
  }

  @Post('/hotel-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadHotelImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(file.buffer);

    return { url: uploadedImage.secure_url };
  }

  @Post('/room-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(file.buffer);

    return { url: uploadedImage.secure_url };
  }

  @Get()
  findAll(@Query() findAllHotelDto: FindHotelDto, @Request() req) {
    return this.hotelService.findAll(findAllHotelDto, req.user.sub);
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
