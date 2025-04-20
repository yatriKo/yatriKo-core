import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary.service';
import { FindBusDto } from './dto/find-all-bus.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';

@Controller('bus')
@UseGuards(AuthGuard, RolesGuard)
@Roles('BusOwner')
export class BusController {
  constructor(
    private readonly busService: BusService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/bus-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadHotelImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(file.buffer);

    return { url: uploadedImage.secure_url };
  }

  @Post()
  create(@Body() createBusDto: CreateBusDto, @Request() req) {
    return this.busService.create(createBusDto, req.user.sub);
  }

  @Get()
  findAll(@Query() findAllBusDto: FindBusDto, @Request() req) {
    return this.busService.findAll(findAllBusDto, req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: CreateBusDto) {
    return this.busService.update(+id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.remove(+id);
  }
}
