import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AddStudentDto, AddStudentsDto } from './dto/add-students.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Post('/students/add')
  @Roles('ADMIN')
  @ApiBody({
    type: AddStudentsDto,
  })
  @ApiTags('students')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addUsers(@UserEntity() user: User, @Body('data') body: AddStudentDto[]) {
    await this.userService.addStudents(user, body)
  }

  @Delete('/students/:id')
  @Roles('ADMIN')
  @ApiTags('students')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeStudent(@UserEntity() user: User, @Param('id') studentId: number) {
    await this.userService.removeStudent(user, studentId)
  }
  
  
}
