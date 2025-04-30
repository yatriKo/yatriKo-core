import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusOwnersService } from './bus-owners.service';
import { CreateBusOwnerDto } from './dto/create-bus-owner.dto';
import { UpdateBusOwnerDto } from './dto/update-bus-owner.dto';

@Controller('bus-owners')
export class BusOwnersController {
  constructor(private readonly busOwnersService: BusOwnersService) {}

  @Post()
  create(@Body() createBusOwnerDto: CreateBusOwnerDto) {
    return this.busOwnersService.create(createBusOwnerDto);
  }

  @Get()
  findAll() {
    return this.busOwnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busOwnersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusOwnerDto: UpdateBusOwnerDto) {
    return this.busOwnersService.update(+id, updateBusOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busOwnersService.remove(+id);
  }
}
