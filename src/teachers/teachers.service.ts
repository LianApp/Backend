import { Injectable } from '@nestjs/common';
import { Course, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TeachersService {

  constructor(private prisma: PrismaService) { }
  
  async getCourses(user: User): Promise<Course[]> {
    const courses = await this.prisma.course.findMany(
        {where: {teacher_id: user.id}}
    );
    return  courses;
  }
}
