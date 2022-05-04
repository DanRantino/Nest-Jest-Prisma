import { Reflector } from '@nestjs/core';
import { createMock } from '@golevelup/ts-jest';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RolesGuard } from './roles.guard';
import * as dotenv from 'dotenv';
import { ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';

dotenv.config();

const secret = process.env.JWT_SECRET;

describe('role guard test', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  beforeEach(() => {
    reflector = new Reflector();
    const prisma = new PrismaService();
    const userService = new UsersService(prisma);
    const jwtService = new JwtService({
      secret,
      signOptions: { expiresIn: '1h' },
    });
    guard = new RolesGuard(reflector, userService, jwtService);
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if user has role', async () => {
    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue(true);
    const canActivate = await guard.canActivate(context);
    expect(canActivate).toBe(true);
  });
});
