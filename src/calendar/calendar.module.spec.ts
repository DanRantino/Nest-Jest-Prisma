import { Test } from '@nestjs/testing';
import { CalendarModule } from './calendar.module';

describe('MyController', () => {
  let myController: CalendarModule;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CalendarModule],
    }).compile();

    myController = module.get<CalendarModule>(CalendarModule);
  });

  it('should be defined', () => {
    expect(myController).toBeDefined();
  });
});
