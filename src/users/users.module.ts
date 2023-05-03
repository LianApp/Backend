import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';
import { BullModule } from '@nestjs/bull';
import { UsersController } from './users.controller';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: "email-queue"
    })
  ],
  providers: [UsersService, PasswordService],
  controllers: [UsersController],
})
export class UsersModule {}
