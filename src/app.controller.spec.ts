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
    it('should return "Hello World!"', () => {
      expect(appController.getHello({} as unknown as Request)).toBe(
        'Hello World!',
      );
    });
  });
});
