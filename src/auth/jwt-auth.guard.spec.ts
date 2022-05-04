import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Passport } from 'passport';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

describe('Jwt auth test', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;
  let jwtStrategy: JwtStrategy;
  let userService: UsersService;
  let prisma: PrismaService;

  const pas = new Passport();
  beforeEach(() => {
    prisma = new PrismaService();
    userService = new UsersService(prisma);
    jwtStrategy = new JwtStrategy(userService);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pas.use('jwt', jwtStrategy);
    reflector = new Reflector();
    guard = new JwtAuthGuard(reflector);
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
