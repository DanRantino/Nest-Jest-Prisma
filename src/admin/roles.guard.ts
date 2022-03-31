import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { ROLES_KEY } from '../decorator/roles.decorateor';
import { Role } from '../enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { IDecodUser } from '../types/User.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const data = context.switchToHttp().getRequest();
    try {
      const jwt = data.headers.authorization.split(' ')[1];
      const user = this.jwtService.decode(jwt) as IDecodUser;
      if (!user.userName) {
        throw new ForbiddenException();
      }
      const userRoles = await this.usersService.getUserRole(user.userName);
      return userRoles.role == Role.ADMIN;
    } catch (err) {
      return false;
    }
  }
}
