import { Injectable } from '@nestjs/common';
import { Course, Group, Subject, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TeachersService {

  constructor(private prisma: PrismaService) { }
  
  async getCourses(user: User): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      where: {teacher_id: user.id},
      include: { lessons: true }
    });
    return  courses;
  }

  async getSubjects(user: User): Promise<Subject[]> {
    const subjects = await this.prisma.user.findUnique({ where: { id: user.id } }).subjects()
    return subjects
    
  }
  
}
