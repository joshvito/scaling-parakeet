import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger.module';
import { InjectionMiddleware } from './injection.middleware';
import { CrossSiteScriptingMiddleware } from './xss.middleware';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        InjectionMiddleware,
        CrossSiteScriptingMiddleware,
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
