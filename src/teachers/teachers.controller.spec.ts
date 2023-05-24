import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

describe('TeachersController', () => {
    let controller: TeachersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TeachersController],
            providers: [TeachersService, PrismaService],
        }).compile();

        controller = module.get<TeachersController>(TeachersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
