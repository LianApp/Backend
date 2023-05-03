import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';

@Controller('/api/lessons')
@ApiTags('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(":id")
  async getLesson(@Param('id') lessonId: number) {

    return await this.lessonsService.getLesson(lessonId);
  }

}
