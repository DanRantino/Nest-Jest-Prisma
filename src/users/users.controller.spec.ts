import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService] as unknown as Provider<
        UsersService | PrismaService
      >[],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login should be defined', () => {
    expect(controller.login).toBeDefined();
  });

  it('create should be defined', () => {
    expect(controller.createUser).toBeDefined();
  });

  it('get Many users should be defined', () => {
    expect(controller.getAllUsers).toBeDefined();
  });
});
