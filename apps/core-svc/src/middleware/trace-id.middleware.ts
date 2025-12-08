import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AppLogger } from '../logger/app-logger.service';

import type { TraceableRequest } from '../types/express';
import type { NextFunction, Response } from 'express';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {}

  use(req: TraceableRequest, res: Response, next: NextFunction): void {
    const traceId = this.resolveTraceId(req);
    req.traceId = traceId;
    res.locals.traceId = traceId;
    res.setHeader('x-trace-id', traceId);

    const startedAt = Date.now();
    res.on('finish', () => {
      const durationMs = Date.now() - startedAt;
      this.logger.log('request_completed', 'HTTP', {
        traceId,
        method: req.method,
        path: req.originalUrl ?? req.url,
        status: res.statusCode,
        durationMs,
        userAgent: req.headers['user-agent'],
        contentLength: res.getHeader('content-length'),
      });
    });

    next();
  }

  private resolveTraceId(req: TraceableRequest): string {
    const incoming = req.headers['x-trace-id'];
    if (typeof incoming === 'string' && incoming.trim()) {
      return incoming;
    }
    if (Array.isArray(incoming) && incoming.length && incoming[0]) {
      return incoming[0];
    }
    return randomUUID();
  }
}
