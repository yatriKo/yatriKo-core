import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusOwnersService } from './bus-owners.service';

@Controller('bus-owners')
export class BusOwnersController {
  constructor(private readonly busOwnersService: BusOwnersService) {}

  @Get()
  findAll() {
    return this.busOwnersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busOwnersService.remove(+id);
  }
}
