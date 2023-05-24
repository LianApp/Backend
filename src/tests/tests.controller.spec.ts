import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

describe('TestsController', () => {
    let controller: TestsController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TestsController],
            providers: [TestsService, PrismaService],
        }).compile();

        controller = module.get<TestsController>(TestsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
