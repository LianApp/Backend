import { Injectable, NotFoundException } from '@nestjs/common';
import { Course, Lesson, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

  constructor(private readonly prisma: PrismaService) { }
  
  async create(user: User, createCourseDto: CreateCourseDto) {
    await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        subject_id: createCourseDto.subjectId,
        teacher_id: user.id,
      }
    })
  }

  async findTeacherCourses(user: User) {
    return await this.prisma.course.findMany({
      where: {
        teacher_id: user.id
      }
    })
  }


  async findStudentCourses(user: User) {
    let studentGroup = await this.prisma.group.findUnique({
      where: {
        id: user.group_id
      },
      include: {
        courses: true
      }
    });
    return studentGroup.courses
  }

  async getCourseLessons(user: User, courseId: number): Promise<Lesson[]> {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId
      },
      include: {
        lessons: true,
        groups: true,
      },
    })
    if (!course.groups.find(g => g.id === user.id) && course.teacher_id !== user.id) { 
      throw new NotFoundException();
    }
    return course.lessons
  }

  async findOne(user: User, courseId: number): Promise<Course> {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId
      },
      include: {
        groups: true,
      },
    })
    if (!course.groups.find(g => g.id === user.id) && course.teacher_id !== user.id) { 
      throw new NotFoundException();
    }
    return course
  }
  
}
