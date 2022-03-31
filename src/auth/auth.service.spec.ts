import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as dotenv from 'dotenv';
import { IUserR } from '../models/user';

dotenv.config();

const secret = process.env.JWT_SECRET;

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    userService = new UsersService(prismaService);
    jwtService = new JwtService({
      secret: secret,
      signOptions: { expiresIn: '60s' },
    });
    authService = new AuthService(userService, jwtService);
  });

  describe('test validate User', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
    it('should be return an valid user', async () => {
      const result = {
        createdAt: new Date('2022-03-30T17:23:58.991Z'),
        id: 17,
        updatedAt: new Date('2022-03-30T17:23:58.993Z'),
        userName: 'teste@dan.com',
      };
      const call: IUserR = await authService.validateUser(
        'teste@dan.com',
        'teste123',
      );
      expect(call).toStrictEqual(result);
    });
    it('should return a new acces_token', async () => {
      const user = {
        createdAt: new Date('2022-03-30T17:23:58.991Z'),
        id: 17,
        updatedAt: new Date('2022-03-30T17:23:58.993Z'),
        userName: 'teste@dan.com',
      };
      expect(await authService.login(user)).toHaveProperty('access_token');
    });
  });
  it('should return null since user is not in the database', async () => {
    expect(await authService.validateUser('teste@dan1.com', 'teste123')).toBe(
      null,
    );
  });
});
