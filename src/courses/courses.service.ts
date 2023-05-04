import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Course, Lesson, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

  constructor(private readonly prisma: PrismaService) { }
  
  async create(user: User, createCourseDto: CreateCourseDto) {
    return await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        subject_id: createCourseDto.subjectId,
        teacher_id: user.id,
      }
    })
  }

  async getGroups(user: User, courseId: number) {
    const course = await this.prisma.course.findUnique({ where: { id : courseId }, include: { groups: true }});
    if (course === null) {
      throw new NotFoundException("Can't get course with given id");
    }
    if (course.teacher_id !== user.id) {
      throw new UnauthorizedException();
    }
    return course.groups;
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
    if (studentGroup === null) {
      throw new NotFoundException("Can't get group with given id");
    }
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
    if (course === null) {
      throw new NotFoundException("Can't get course with given id");
    }
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
    if (course === null) {
      throw new NotFoundException("Can't get course with given id");
    }
    if (!course.groups.find(g => g.id === user.id) && course.teacher_id !== user.id) { 
      throw new NotFoundException();
    }
    return course
  }
  
}
