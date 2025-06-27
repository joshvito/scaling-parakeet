import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AttackType, FileSystemLogger } from '../logger.service';

@Injectable()
export class CrossSiteScriptingMiddleware implements NestMiddleware {
  private readonly attackType = AttackType.XSS;
  constructor(private readonly logger: FileSystemLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    next();
    if (this.detect(req)) {
      this.logger.flagRequest(req, this.attackType);
    }
  }

  detect(req: Request): boolean {
    const xssPatterns = [
      /<script.*?>|(\bonerror=|onload=\b)/i,
      /javascript(?:&#x3A;|&#58;|:)/i,
      /document(?:&#x2E;|&#46;|\.)?(cookie|cookieStore)/i,
      /document(?:&#x2E;|&#46;|\.)?getElementsBy(ClassName|Id|TagName)/i,
      /document(?:&#x2E;|&#46;|\.)?dispatchEvent/i,
      /document(?:&#x2E;|&#46;|\.)?(write|location|eval|createElement)/i,
    ];

    return (
      xssPatterns.some((pattern) => pattern.test(JSON.stringify(req.body))) ||
      xssPatterns.some((pattern) => pattern.test(JSON.stringify(req.query))) ||
      xssPatterns.some((pattern) => pattern.test(JSON.stringify(req.headers)))
    );
  }
}
