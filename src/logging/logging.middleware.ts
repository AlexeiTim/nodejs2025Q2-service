import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const startTime = Date.now();

    this.loggingService.log(
      `Incoming Request: ${JSON.stringify({
        method,
        url: originalUrl,
        query,
        body,
      })}`,
      'RequestLogger',
    );

    const originalSend = res.send;
    const loggingService = this.loggingService;

    res.send = function (body) {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;

      loggingService.log(
        `Outgoing Response: ${JSON.stringify({
          statusCode,
          responseTime: `${responseTime}ms`,
          body,
        })}`,
        'ResponseLogger',
      );

      return originalSend.call(this, body);
    };

    next();
  }
}
