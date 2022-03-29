import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const prisma = new PrismaClient();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const test = await service.getAllUsers();
    expect(Array.isArray(test.data)).toBeTruthy;
  });

  it('should return an array of users without password', async () => {
    const test = await service.getAllUsers();
    expect(Array.isArray(test.data)).toBeTruthy;
    if (Array.isArray(test.data)) {
      for (let i = 0; i < test.data.length; i++) {
        const arr = test.data[i];
        expect(arr).toHaveProperty('userName');
        expect(arr).toHaveProperty('id');
        expect(arr).toHaveProperty('createdAt');
        expect(arr).toHaveProperty('updatedAt');
        expect(arr).not.toHaveProperty('password');
      }
    }
  });

  it('should create a user but return the user without the password', async () => {
    const { data: test } = await service.createUser({
      password: 'test123',
      userName: 'tester1',
    });
    expect(test).toHaveProperty('userName');
    expect(test).toHaveProperty('id');
    expect(test).toHaveProperty('createdAt');
    expect(test).toHaveProperty('updatedAt');
    expect(test).not.toHaveProperty('password');
  });
  it('should return an password error', async () => {
    const createdUser = await service.createUser({
      password: 'test1234',
      userName: 'tester235',
    });
    const user = await service.login({
      password: 'test12345',
      userName: 'tester235',
    });
    expect(user.err.hasError).toBe(true);
    expect(user.err).toHaveProperty('errorMessage');
  });
});
