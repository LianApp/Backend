import { Test, TestingModule } from '@nestjs/testing';
import { Chance } from 'chance';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const chance = new Chance();

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

});
