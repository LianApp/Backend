import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('/api/courses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('TEACHER')
  async create(@Body() createCourseDto: CreateCourseDto, @UserEntity() user: User) {
    return await this.coursesService.create(user, createCourseDto);
  }

  @Get(':id/lessons')
  async getLessons(@Param('id') courseId: number, @UserEntity() user: User) {
    return await this.coursesService.getCourseLessons(user, courseId);
  }

  @Get(':id')
  async findOne(@Param('id') courseId: number, @UserEntity() user: User) { 
    return await this.coursesService.findOne(user, courseId)
  }

  @Post()
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  async createCourse(@UserEntity() teacher: User, @Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.create(teacher, createCourseDto)
  }
  
}
