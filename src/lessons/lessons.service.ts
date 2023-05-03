import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) { }

  async getLesson(lessonId: number) {
    return await this.prisma.lesson.findUnique({
      where: {
        id: lessonId
      },
    });
  }
}
