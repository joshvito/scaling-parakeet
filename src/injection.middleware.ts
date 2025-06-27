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
        if(this.detect(req)){
            this.logger.flagRequest(req, AttackType.SqlInjection);
        }
    }

    detect(req: Request): boolean {
        const sqlInjectionPatterns = [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE)\b)/i,
            /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
            /(\b(OR|AND)\s+['"]?\w+['"]?\s*=\s*['"]?\w+['"]?)/i,
            /('.*--)/,
            /('.*;)/,
            /('|")\s*(OR|AND)\s+1\s*=\s*1/i,
            /\bUNION\b\s+SELECT/i
        ];

        return sqlInjectionPatterns.some(pattern => pattern.test(JSON.stringify(req.body))) 
            || sqlInjectionPatterns.some(pattern => pattern.test(JSON.stringify(req.query)))
            || sqlInjectionPatterns.some(pattern => pattern.test(JSON.stringify(req.headers)));
    }
}
