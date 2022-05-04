import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;
  let userService: UsersService;
  let prisma: PrismaService;
  jest.setTimeout(10000);
  beforeEach(async () => {
    prisma = new PrismaService();
    userService = new UsersService(prisma);

    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarService, PrismaService],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error user not found', async () => {
    expect(await (await service.getAllOpen('10000')).err.errorMessage).toBe(
      'User not found',
    );
  });

  it('should return a new calendar', async () => {
    const user = await prisma.user.create({
      data: {
        userName: 'test123@test123.com',
        password: 'test123',
      },
    });
    await prisma.calendar.create({
      data: {
        year: 2022,
        month: 1,
        title: 'JANUARY',
        openDates: [],
        reservedDates: [],
        user: {
          connect: {
            id: user.id,
          },
        },
        description: 'Test',
        timeRequired: 'HALF_HOUR',
      },
    });

    const arr = await service.getAllOpen(user.id.toString());
    if (Array.isArray(arr.data)) {
      expect(arr.data.length).toBeGreaterThanOrEqual(1);
    }
    expect(await service.getAllOpen(user.id.toString())).toBeGreaterThanOrEqual(
      1,
    );
  });
});
