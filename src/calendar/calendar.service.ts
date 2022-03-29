import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
  getAll() {
    return ['all', 'the', 'data'];
  }
}
