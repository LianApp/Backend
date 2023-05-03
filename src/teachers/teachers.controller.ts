import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { User } from '@prisma/client';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('')
  @Roles('TEACHER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCourses(@UserEntity() user: User) {
    return await this.teachersService.getCourses(user);
  }
  
}
