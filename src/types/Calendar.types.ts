import { Months, TimeReq } from '.prisma/client';
import { IUser } from './User.types';

export interface ICalendar {
  id?: number;
  userId?: number;
  month?: number;
  year?: number;
  title: Months;
  description: string;
  openDates: Date[];
  reservedDates: Date[];
  timeRequired: TimeReq;
  user?: IUser;
}
