import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

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

  async getLesson(lessonId: number) {
    return await this.prisma.lesson.findUnique({
      where: {
        id: lessonId
      },
    });
      
  }
}
