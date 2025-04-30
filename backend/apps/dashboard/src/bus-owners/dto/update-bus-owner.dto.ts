import { PartialType } from '@nestjs/mapped-types';
import { CreateBusOwnerDto } from './create-bus-owner.dto';

export class UpdateBusOwnerDto extends PartialType(CreateBusOwnerDto) {}
