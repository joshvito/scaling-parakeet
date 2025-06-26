
import { ConsoleLogger } from '@nestjs/common';
import type { Request } from 'express';
import * as fs from 'fs';
import { timestamp } from 'rxjs';

export enum AttackType {
    SqlInjection = 'SQL Injection',
    XSS = 'Cross-Site Scripting',
    DDoS = 'Denial of Service',
}

export class FileSystemLogger extends ConsoleLogger {
  flagRequest(req: Request, type: AttackType, stack?: string, context?: string) {
    const today = new Date()
        .toISOString()
        .substring(0,10)
        .replace(/-/g, '');
    const heuristic = {
        timestamp: new Date().toISOString(),
        type,
        httpVersion: req.httpVersion,
        ip: req.ip,
        originalUrl: req.originalUrl,
        path: req.path,
        method: req.method,
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params,
    };
    fs.appendFile(`${today}.log.json`, '\n'+JSON.stringify(heuristic), (err) => {
        if (err) super.error('Error writing to file', err);
    });
  }
}
