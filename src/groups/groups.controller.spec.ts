import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

describe('GroupsController', () => {
    let controller: GroupsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GroupsController],
            providers: [GroupsService, PrismaService],
        }).compile();

        controller = module.get<GroupsController>(GroupsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
