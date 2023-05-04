import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { LessonsService } from './lessons.service';

@Controller('/api/lessons')
@ApiTags('lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(":id")
  async getLesson(@Param('id', new ParseIntPipe()) lessonId: number) {
    return await this.lessonsService.getLesson(lessonId);
  }

}
