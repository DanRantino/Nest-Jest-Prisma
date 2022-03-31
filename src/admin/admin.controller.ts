import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorator/roles.decorateor';
import { AdminService } from './admin.service';
import { IUser } from 'src/types/User.types';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Roles(Role.ADMIN)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.adminService.getCalendars(parseInt(id, 10));
  }

  @Roles(Role.ADMIN)
  @Post(':id')
  async addCalendar(
    @Param('id') id: string,
    @Body() calendar: IUser['calendar'],
  ) {
    return await this.adminService.addCalendar(parseInt(id, 10), calendar);
  }
}
