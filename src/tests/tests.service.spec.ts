import { ForbiddenError } from '@nestjs/apollo';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Course, Lesson, PrismaClient, Role, User, Test as ITest } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'nestjs-prisma';
import { CreateTestDto } from './dto/create-test.dto';
import { TestsService } from './tests.service';

describe('TestsService', () => {
    let service: TestsService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TestsService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get(TestsService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should only allow teachers from the same organization the lesson is', () => {

        type LessonWithCourse = Lesson & { course: Course }

        const mockLesson: LessonWithCourse = {
            id: 0,
            course_id: 0,
            course: {
                id: 0,
                icon: '8',
                teacher_id: 0,
                subject_id: 0,
                title: "Some Lesson"
            },
            title: '',
            presentation_url: '',
            lecture_url: ''
        }

        const mockUser: User = {
            id: 0,
            name: 'Nikita',
            role: 'TEACHER',
            email: 'mail@edu.fa.ru',
            password: 'some_password',
            organization_id: 0,
            group_id: 0
        }

        const mockCreateTestDto: CreateTestDto = {
            title: 'New test'
        }

        const lessonId = 0;

        prisma.lesson.findUnique.mockResolvedValueOnce(mockLesson)

        const createdTestMock: ITest = {
            id: 0,
            title: mockCreateTestDto.title,
            lesson_id: lessonId
        }

        prisma.test.create.mockResolvedValueOnce(createdTestMock);

        expect(service.createTest(mockUser, lessonId, mockCreateTestDto))
            .resolves
            .toBe(createdTestMock)

        const mockTeacher2: User = { ...mockUser, id: 1 };

        prisma.lesson.findUnique.mockResolvedValueOnce(mockLesson)

        expect(service.createTest(mockTeacher2, lessonId, mockCreateTestDto))
            .rejects
            .toThrowError(ForbiddenException)
    });

});
