import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../roles/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/travelers')
  @Roles('Admin')
  getTravelers() {
    return this.usersService.findTravelers();
  }

  @Get('/travel-agents')
  @Roles('Admin')
  getTravelAgents() {
    return this.usersService.findTravelAgents();
  }

  @Get('/bus-owners')
  @Roles('Admin')
  getBusOwners() {
    return this.usersService.findBusOwners();
  }

  @Get('/hotel-owners')
  @Roles('Admin')
  getHotelOwners() {
    return this.usersService.findHotelOwners();
  }

  @Delete('/client/:id')
  @Roles('Admin')
  deleteClient(@Param('id') id) {
    return this.usersService.deleteClientUser(+id);
  }

  @Delete('/dashboard/:id')
  @Roles('Admin')
  deleteDashboard(@Param('id') id) {
    return this.usersService.deleteDashboardUser(+id);
  }
}
