import { Injectable } from '@nestjs/common';
import { Calendar } from '@prisma/client';
import { ICalendar } from '../types/Calendar.types';
import { ApiResp, IUserApiResp } from '../types/User.types';
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

  async addCalendar(
    userId: number,
    calendar: ICalendar[],
  ): Promise<ApiResp<ICalendar>> {
    let retCalendar;
    try {
      retCalendar = await this.prisma.user.update({
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
    } catch (e) {
      console.log(e);
      return {
        err: {
          hasError: true,
          errorMessage: 'Error adding calendar',
        },
      };
    }
    console.log(retCalendar);
    return { data: retCalendar.calendar };
  }
}
