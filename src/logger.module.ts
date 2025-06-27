import { Module } from '@nestjs/common';
import { FileSystemLogger } from './logger.service';

@Module({
  providers: [FileSystemLogger],
  exports: [FileSystemLogger],
})
export class LoggerModule {}
