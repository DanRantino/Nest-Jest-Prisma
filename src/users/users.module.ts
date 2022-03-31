import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaService],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
