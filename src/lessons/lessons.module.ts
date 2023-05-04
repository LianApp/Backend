import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
