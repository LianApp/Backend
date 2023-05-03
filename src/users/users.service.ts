import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AddStudentDto } from './dto/add-students.dto'
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateUserDto } from './dto/create-student.dto';
import { Prisma, Role, User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    @InjectQueue('email-queue') private queue: Queue
  ) { }


  async addStudents(user: User, studentList: AddStudentDto[]) {
    
    const students: CreateUserDto[] = studentList.map(
      student => ({
        ...student,
        password: this.passwordService.generatePassword(),
        organizationId: user.organization_id,
      })
    );

    const createStudents: Prisma.UserCreateManyArgs['data'] = await Promise.all(students.map(async s => ({
        email: s.email,
        name: s.name,
        password: await this.passwordService.hashPassword(s.password),
        role: Role.STUDENT,
        organization_id: user.organization_id,
        group_id: user.group_id
    })));
    
    const createUsersArgs: Prisma.UserCreateManyArgs = {
      data: createStudents
    }
      

    await this.prisma.user.createMany(createUsersArgs)

    await Promise.all(
      students.map(
        async s => this.queue.add('email', s)
      )
    )

    return {"message": "Ok"}
    
  }

  async changePassword(
    userId: number,
    userPassword: string,
    changePassword: ChangePasswordDto
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }

  async removeStudent(admin: User, studentId: number) {
    const user = await this.prisma.user.findFirst({where: {
      organization_id: admin.organization_id,
      id: studentId
    }})

    if (!user) {
      throw new ForbiddenException()
    }

    return await this.prisma.user.delete({ 
      where: { 
        id: user.id
      }
    });
    
  }

  async getCourses(user: User) {
    const group_id = user.group_id;
    return await this.prisma.group.findUnique({
      where: {
        id: group_id
      },
    }).courses({include: {lessons: true}})
  }
}
