import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AttackType, FileSystemLogger } from './logger.service';

@Controller()
export class AppController {
  constructor(private logger: FileSystemLogger) {
    this.logger.setContext(AppController.name);
  }

  @Get()
  getHello(@Req() req: Request): string {
    this.logger.flagRequest(req, AttackType.DDoS);
    return 'Hello World!';
  }
}
