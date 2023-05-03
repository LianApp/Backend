import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('/courses')
  @Roles('TEACHER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCourses(@UserEntity() user: User) {
    return await this.teachersService.getCourses(user);
  }

  
}
