import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger.module';
import { CrossSiteScriptingMiddleware } from './middleware/xss.middleware';
import { InjectionMiddleware } from './middleware/injection.middleware';
import { BruteForceMiddleware } from './middleware/brute.middleware';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        InjectionMiddleware,
        CrossSiteScriptingMiddleware,
        BruteForceMiddleware,
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
