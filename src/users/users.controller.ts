import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUser, IUserApiResp, IUserRequest } from '../types/User.types';
import { UsersService } from './users.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../decorator/public';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Public()
  @Get()
  async getAllUsers(): Promise<IUserApiResp> {
    return await this.userService.getAllUsers();
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<any> {
    return await this.userService.findById(id);
  }

  @Public()
  @Post()
  async createUser(@Body() userData: IUserRequest): Promise<IUserApiResp> {
    return await this.userService.createUser(userData);
  }
}
