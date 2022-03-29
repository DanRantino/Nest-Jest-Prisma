import { Injectable } from '@nestjs/common';
import { IUserS, IUserApiResp } from '../models/user';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<IUserApiResp> {
    const users = await this.prisma.user.findMany({
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
        userName: true,
        password: false,
      },
    });
    return { data: users };
  }

  async createUser(userData: IUserS): Promise<IUserApiResp> {
    const { password } = userData;
    const hasedPassword = await bcrypt.hash(password, 10);
    userData.password = hasedPassword;
    const user = await this.prisma.user.create({
      data: userData,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
        userName: true,
      },
    });
    return { data: user };
  }

  async login(userData: IUserS): Promise<IUserApiResp> {
    const user = await this.prisma.user.findUnique({
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
        userName: true,
        password: true,
      },
      where: {
        userName: userData.userName,
      },
    });
    if (await bcrypt.compare(userData.password, user.password)) {
      const res = {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        userName: user.userName,
      };
      const header = await generateToken(res);
      return { header, data: res };
    } else {
      return {
        data: null,
        err: { hasError: true, errorMessage: 'Invalid Password!' },
      };
    }
  }
}
