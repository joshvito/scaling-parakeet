import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileSystemLogger } from './logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(
    new FileSystemLogger({
      json: true,
    }),
  );
  app.set('trust proxy', true);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
