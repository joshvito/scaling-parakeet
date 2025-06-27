import { ConsoleLogger } from '@nestjs/common';
import type { Request } from 'express';
import * as fs from 'fs';

export enum AttackType {
  SqlInjection = 'SQL Injection',
  XSS = 'Cross-Site Scripting',
  DDoS = 'Denial of Service',
}

export class FileSystemLogger extends ConsoleLogger {
  flagRequest(req: Request, type: AttackType) {

    const today = new Date().toISOString();
    const logFileName = today.substring(0, 10).replace(/-/g, '');
    const heuristic = {
      timestamp: today,
      type,
      httpVersion: req.httpVersion,
      ip: req.ip,
      originalUrl: req.originalUrl,
      path: req.path,
      method: req.method,
      headers: req.headers,
      body: req.body as unknown,
      query: req.query,
      params: req.params,
    };

    fs.appendFile(
      `${logFileName}.log.json`,
      '\n' + JSON.stringify(heuristic),
      (err) => {
        if (err) super.error('Error writing to log file', err);
      },
    );
  }
}
