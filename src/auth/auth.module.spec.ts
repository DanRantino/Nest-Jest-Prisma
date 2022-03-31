import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { IUser } from '../types/User.types';
import { SetMetadata, UnauthorizedException } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../decorator/public';

dotenv.config();
const secret = process.env.JWT_SECRET;

describe('auth module', () => {
  let authService: AuthService;
  let userService: UsersService;
  let prismaService: PrismaService;
  let localStrategy: LocalStrategy;
  let jwtStrategy: JwtStrategy;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        PrismaService,
        LocalStrategy,
        JwtStrategy,
      ],
      exports: [AuthService],
    }).compile();
    authService = await moduleRef.resolve(AuthService);
    userService = await moduleRef.resolve(UsersService);
    prismaService = await moduleRef.resolve(PrismaService);
    localStrategy = await moduleRef.resolve(LocalStrategy);
    jwtStrategy = await moduleRef.resolve(JwtStrategy);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(localStrategy).toBeDefined();
    expect(jwtStrategy).toBeDefined();
  });

  it('shoul be defined', () => {
    expect(authService.login).toBeDefined();
    expect(authService.validateUser).toBeDefined();
    expect(userService.createUser).toBeDefined();
    expect(userService.findById).toBeDefined();
    expect(userService.findOne).toBeDefined();
    expect(userService.getAllUsers).toBeDefined();
    expect(prismaService.user).toBeDefined();
    expect(localStrategy.validate).toBeDefined();
    expect(jwtStrategy.validate).toBeDefined();
  });

  describe('test auth service', () => {
    it('should be return an valid user', async () => {
      const result1 = {
        createdAt: new Date('2022-03-30T22:37:18.114Z'),
        id: 91,
        updatedAt: new Date('2022-03-30T22:37:18.115Z'),
        userName: 'teste@dan.com',
      };
      const call: IUser = await authService.validateUser(
        'teste@dan.com',
        'teste123',
      );
      expect(call).toEqual(result1);
    });
    it('should return a new acces_token', async () => {
      const user = {
        createdAt: new Date('2022-03-30T22:37:18.114Z'),
        calendar: [],
        id: 91,
        params: {
          id: 1,
          userId: null,
          openTime: 8,
          closeTime: 18,
        },
        role: 'USER',
        updatedAt: new Date('2022-03-30T22:37:18.115Z'),
        paramsId: 1,
        userName: 'teste@dan.com',
      };
      expect(await authService.login(user)).toHaveProperty('access_token');
    });
    it('should return null since user is not in the database', async () => {
      expect(await authService.validateUser('teste@dan1.com', 'teste123')).toBe(
        null,
      );
    });
  });
  describe('test if isn´t public', () => {
    it('should return a user', async () => {
      SetMetadata(IS_PUBLIC_KEY, false);
      const user = {
        createdAt: new Date('2022-03-30T14:58:58.325Z'),
        id: 1,
        updatedAt: new Date('2022-03-30T21:08:40.413Z'),
        userName: 'tester1',
      };
      const ret = await jwtStrategy.validate({ sub: 1 });
      expect(ret).toEqual(user);
    });
  });
});
