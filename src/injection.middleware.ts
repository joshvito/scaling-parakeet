
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AttackType, FileSystemLogger } from './logger.service';

@Injectable()
export class InjectionMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: FileSystemLogger,
    ) {  }

    use(req: Request, res: Response, next: NextFunction) {
        next();
        this.logger.flagRequest(req, AttackType.SqlInjection);
    }
}
