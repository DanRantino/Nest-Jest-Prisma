import { Injectable } from '@nestjs/common';
import { IUser, IUserApiResp, IUserRequest } from '../types/User.types';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /* 
    Get all users
  */
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

  /* 
    Create new user
  */
  async createUser(userData: IUserRequest): Promise<IUserApiResp> {
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
        calendar: true,
      },
    });
    return { data: user };
  }

  /* 
    find user by user name and compare the password
  */
  async findOne(userName: string, password: string): Promise<IUserApiResp> {
    const user = await this.prisma.user.findUnique({
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
        userName: true,
        password: true,
      },
      where: {
        userName: userName,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...res } = user;
      return { data: res };
    } else {
      return {
        data: null,
        err: { hasError: true, errorMessage: 'Invalid Password!' },
      };
    }
  }

  /*
    Find user by id
  */
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      select: {
        createdAt: true,
        calendar: false,
        id: true,
        params: false,
        role: false,
        updatedAt: true,
        paramsId: false,
        userName: true,
        password: false,
      },
      where: {
        id: Number(id),
      },
    });
    return user;
  }

  /*
    Find user role by username
  */
  async getUserRole(userName: string) {
    const user = await this.prisma.user.findUnique({
      select: {
        createdAt: false,
        id: false,
        updatedAt: false,
        userName: false,
        password: false,
        role: true,
      },
      where: {
        userName: userName,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
