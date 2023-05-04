import { Get, Body, Controller, Delete, Param, Post, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AddStudentDto, AddStudentsDto } from './dto/add-students.dto';
import { CourseModel } from './models/course.model';
import { UsersService } from './users.service';

@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Post('/api/students')
  @Roles('ORGANIZATOR')
  @ApiBody({
    type: AddStudentsDto,
  })
  @ApiTags('students')
  @UseGuards(RolesGuard)
  async addUsers(@UserEntity() user: User, @Body('data') body: AddStudentDto[]) {
    await this.userService.addStudents(user, body)
  }
  
  @Post('/api/teachers')
  @Roles('ORGANIZATOR')
  @ApiBody({
    type: AddStudentsDto,
  })
  @ApiTags('teachers')
  @UseGuards(RolesGuard)
  async addTeachers(@UserEntity() user: User, @Body('data') body: AddStudentDto[]) {
    await this.userService.addStudents(user, body, 'TEACHER')
  }

  @Delete('/api/students/:id')
  @Roles('ORGANIZATOR')
  @ApiTags('students')
  @UseGuards(RolesGuard)
  async removeStudent(@UserEntity() user: User, @Param('id', new ParseIntPipe()) studentId: number) {
    await this.userService.removeStudent(user, studentId)
  }

  @Get('/api/students/courses')
  @ApiTags('students')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @ApiOkResponse({type: [CourseModel]})
  async getCourses(@UserEntity() user: User) {
    return await this.userService.getCourses(user);
  }
  
  
  
}
