import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AttackType, FileSystemLogger } from '../logger.service';

@Injectable()
export class DdosMiddleware implements NestMiddleware {
  // Set the defaults low for testing purposes;
  private readonly maxRequestsPerMinute = this.getEnvInt('MAX_ATTEMPTS', 1);
  private readonly windowMs = this.getEnvInt('WINDOW_MS', 0.5 * 1000);
  private readonly attackType = AttackType.DDoS;
  private ipAttempts = new Map<string, number[]>();

  constructor(private readonly logger: FileSystemLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.ipAttempts.get(req.ip!)?.push(Date.now());
    next();
    if (this.detect(req)) {
      this.logger.flagRequest(req, this.attackType);
    }
  }

  detect(req: Request): boolean {
    const currentTime = Date.now();
    const attempts = this.ipAttempts.get(req.ip!) || [];
    this.ipAttempts.set(
      req.ip!,
      attempts.filter((timestamp) => timestamp > currentTime - this.windowMs),
    );

    return attempts.length > this.maxRequestsPerMinute;
  }

  getEnvInt(key: string, defaultValue: number): number {
    const value = process.env[key];
    if (value === undefined) {
      return defaultValue;
    }
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      return defaultValue;
    }
    return parsedValue;
  }
}
