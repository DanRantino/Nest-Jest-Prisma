import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  validateUser(username: string, password: string) {}
  constructor(private userService: UsersService) {}
}
