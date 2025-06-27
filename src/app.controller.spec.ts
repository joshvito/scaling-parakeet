import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FileSystemLogger } from './logger.service';
import { Request } from 'express';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [FileSystemLogger],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be sane', () => {
      expect(true).toBeTruthy()
    });
  });
});
