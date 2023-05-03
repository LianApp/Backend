import { Controller, Get, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('/api/teachers')
@ApiTags('teachers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('/courses')
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  async getCourses(@UserEntity() user: User) {
    return await this.teachersService.getCourses(user);
  }

  
}
