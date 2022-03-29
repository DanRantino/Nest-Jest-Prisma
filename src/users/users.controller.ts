import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { IUserS, IUserApiResp } from 'src/models/user';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<IUserApiResp> {
    return await this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() userData: IUserS): Promise<IUserApiResp> {
    return await this.userService.createUser(userData);
  }

  @Post('login')
  async login(
    @Body() userData: IUserS,
    @Res() res: Response,
  ): Promise<Response<IUserApiResp>> {
    const response = await this.userService.login(userData);
    if (response.err?.hasError) {
      return res.status(401).json(response);
    }
    return res
      .setHeader('authorization', `Bearer ${response.header}`)
      .status(200)
      .json({ data: response.data, err: { ...response.err } });
  }
}
