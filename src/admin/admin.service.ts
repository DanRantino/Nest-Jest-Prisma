import { Injectable } from '@nestjs/common';
import { Calendar } from '@prisma/client';
import { IUserApiResp } from 'src/types/User.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  /*
    get all calendars from specific user
  */
  async getCalendars(userId: number): Promise<IUserApiResp> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        calendar: true,
        id: true,
        password: false,
        userName: true,
        role: true,
        params: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return {
        err: {
          hasError: true,
          errorMessage: 'User not found',
        },
      };
    }
    return { data: user };
  }

  /*
    add calendar to an user
  */

  async addCalendar(userId: number, calendar: Calendar[]): Promise<any> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { calendar: { create: calendar } },
      select: {
        calendar: true,
        id: true,
        password: false,
        userName: true,
        role: true,
        params: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
