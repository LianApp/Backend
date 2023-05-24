import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { LessonsService } from './lessons.service';

describe('LessonsService', () => {
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [LessonsService, PrismaService],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
