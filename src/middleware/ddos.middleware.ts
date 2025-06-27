import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AttackType, FileSystemLogger } from '../logger.service';

@Injectable()
export class DdosMiddleware implements NestMiddleware {
    attackType = AttackType.DDoS;
    constructor(
        private readonly logger: FileSystemLogger,
    ) {  }

    use(req: Request, res: Response, next: NextFunction) {
        next();
        if(this.detect(req)){
            this.logger.flagRequest(req, this.attackType);
        }
    }

    detect(req: Request): boolean {
        return false;
    }
}
