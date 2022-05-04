import { Injectable } from '@nestjs/common';
import { Calendar } from '@prisma/client';
import { ApiResp } from '../types/User.types';
import { PrismaService } from '../prisma/prisma.service';
import { ICalendar } from '../types/Calendar.types';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getAllOpen(id: string): Promise<ApiResp<ICalendar>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        calendar: true,
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

    if (user.calendar[0].openDates.length < 1) {
      const newCalendar = await this.populateCalendar(user.calendar);
      return { data: newCalendar };
    }
    const ret = user.calendar;
    return { data: ret };
  }

  async populateCalendar(calendar: Calendar[]): Promise<Calendar[]> {
    calendar.map((i) => {
      if (i.openDates.length === 0) {
        i.openDates = [];
        const start = new Date(i.year, i.month - 1);
        while (start.getMonth() === i.month - 1) {
          if (i.reservedDates.includes(new Date(start))) {
            continue;
          }
          i.openDates.push(new Date(start));
          start.setDate(start.getDate() + 1);
        }
      }
    });
    const ret = async () => {
      return calendar.map(async (c) => {
        await this.prisma.calendar.update({
          where: {
            id: c.id,
          },
          data: {
            openDates: {
              set: c.openDates,
            },
          },
        });
        return calendar;
      });
    };
    console.log(await ret()[0]);
    return ret()[0];
  }
}
