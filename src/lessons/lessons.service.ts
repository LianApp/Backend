import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateTestDto } from 'src/tests/dto/create-test.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(courseId: number, title: string, presentationUrl: string, lectionUrl: string) {
    return await this.prisma.lesson.create({
      data: {
        title: title,
        presentation_url: presentationUrl,
        lecture_url: lectionUrl,
        course_id: courseId
      }
    })
  }
  
  async createTest(user: User, lessonId: number, createTestDto: CreateTestDto) {
      const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId }, include: { course: true } });
      if (user.id !== lesson?.course.teacher_id) {
          throw new ForbiddenException("You have not access to create test for this lesson")
      }
      return await this.prisma.test.create({
          data: {
              lesson_id: lessonId,
              title: createTestDto.title,
          }
      })
  }
  
  async getLesson(lessonId: number) {
    return await this.prisma.lesson.findUnique({
      where: {
        id: lessonId
      },
      include: {
        test: true
      }
    });
  }
}
