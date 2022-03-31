import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
dotenv.config();

const secret = process.env.JWT_SECRET;

@Module({
  imports: [
    PrismaService,
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AdminService,
    UsersService,
    PrismaService,

    JwtStrategy,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  controllers: [AdminController],
})
export class AdminModule {}
