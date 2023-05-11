import { Get, Body, Controller, Delete, Param, Post, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AddStudentsDto, AddTeachersDto } from './dto/add-students.dto';
import { CourseModel } from './models/course.model';
import { UsersService } from './users.service';

@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Post('/api/students')
  @Roles('ORGANIZATOR')
  @ApiOperation({ description: "Add students\nRoles: ORGANIZATOR" })
  @ApiBody({
    type: AddStudentsDto,
  })
  @ApiTags('students')
  @UseGuards(RolesGuard)
  async addUsers(@UserEntity() user: User, @Body() body: AddStudentsDto) {
    return await this.userService.addStudents(user, body.data)
  }
  
  @Post('/api/teachers')
  @Roles('ORGANIZATOR')
  @ApiOperation({ description: "Add teachers\nRoles: ORGANIZATOR" })
  @ApiBody({
    type: AddTeachersDto,
  })
  @ApiTags('teachers')
  @UseGuards(RolesGuard)
  async addTeachers(@UserEntity() user: User, @Body() body: AddTeachersDto) {
    return await this.userService.addStudents(user, body.data, 'TEACHER')
  }

  @Delete('/api/students/:id')
  @Roles('ORGANIZATOR')
  @ApiTags('students')
  @ApiOperation({ description: "Remove student\nRoles: ORGANIZATOR" })
  @UseGuards(RolesGuard)
  async removeStudent(@UserEntity() user: User, @Param('id', new ParseIntPipe()) studentId: number) {
    await this.userService.removeStudent(user, studentId)
  }

  @Get('/api/students/courses')
  @ApiTags('students')
  @Roles('STUDENT')
  @ApiOperation({ description: "Get all student courses\nRoles: STUDENT" })
  @UseGuards(RolesGuard)
  @ApiOkResponse({type: [CourseModel]})
  async getCourses(@UserEntity() user: User) {
    return await this.userService.getCourses(user);
  }
  
  
  
}
