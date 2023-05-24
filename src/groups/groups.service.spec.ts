import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { GroupsService } from './groups.service';

describe('GroupsService', () => {
    let service: GroupsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GroupsService, PrismaService],
        }).compile();

        service = module.get<GroupsService>(GroupsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
