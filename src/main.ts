import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileSystemLogger } from './logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new FileSystemLogger({
      json: true,
    }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
