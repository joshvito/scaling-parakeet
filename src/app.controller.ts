import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { FileSystemLogger } from './logger.service';

@Controller()
export class AppController {
  constructor(private logger: FileSystemLogger) {
    this.logger.setContext(AppController.name);
  }

  @Get()
  getHello(@Req() req: Request): string {
    return 'Hello World!';
  }
}
