import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelOwnerDto } from './create-hotel-owner.dto';

export class UpdateHotelOwnerDto extends PartialType(CreateHotelOwnerDto) {}
