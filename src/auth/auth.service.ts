import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser, IUserRequest } from '../types/User.types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    console.log('validateUser: ', userName, password);
    const { data: user } = await this.userService.findOne(userName, password);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { userName: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
