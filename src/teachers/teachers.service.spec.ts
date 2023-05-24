import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { TeachersService } from './teachers.service';

describe('TeachersService', () => {
  let service: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [TeachersService, PrismaService],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
