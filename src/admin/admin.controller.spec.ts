import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, PrismaService],
      controllers: [AdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have getOne', () => {
    expect(controller.getOne).toBeDefined();
  });

  it('should return an error', async () => {
    const user = await controller.getOne('1');
    expect(user.err.hasError).toBe(true);
  });

  it('should return a user', async () => {
    const user = await controller.getOne('3');
    if (!Array.isArray(user.data)) {
      expect(user.data.id).toBe(Number(3));
      expect(user.data.userName).toBe('teste@dan.com');
    }
  });
  it('should do add a calendar', async () => {
    const { data: calendar } = await controller.addCalendar('3', [
      {
        month: 3,
        year: 2022,
        title: 'MARCH',
        description: 'teste',
        openDates: [],
        reservedDates: [],
        timeRequired: 'HALF_HOUR',
      },
    ]);
    console.log(calendar);
    expect(Array.isArray(calendar)).toBe(true);
    if (Array.isArray(calendar)) {
      expect(calendar[1].month).toBe(3);
      expect(calendar[1].year).toBe(2022);
      //expect(calendar.calendar[1].userId).toBe(3);
      expect(calendar[1].title).toBe('MARCH');
      expect(calendar[1].description).toBe('teste');
      expect(calendar[1].openDates).toStrictEqual([]);
    }
  });
  it('should return an error', async () => {
    const { err } = await controller.addCalendar('12356125753', [
      {
        month: 3,
        year: 2022,
        title: 'MARCH',
        description: 'teste',
        openDates: [],
        reservedDates: [],
        timeRequired: 'HALF_HOUR',
      },
    ]);
    expect(err.hasError).toBe(true);
    expect(err.errorMessage).toBeTruthy();
  });
});
