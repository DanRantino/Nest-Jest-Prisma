import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CalendarService } from './calendar/calendar.service';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarModule } from './calendar/calendar.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    CalendarModule,
    AuthModule,
    AdminModule,
    PrismaService,
  ],
  controllers: [AppController, CalendarController],
  providers: [
    AppService,
    CalendarService,
    PrismaService,
    /*{
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },*/
  ],
})
export class AppModule {}
