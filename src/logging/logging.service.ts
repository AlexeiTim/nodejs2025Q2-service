import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggingService implements LoggerService {
  private logger: Logger;

  constructor() {
    const logLevel = process.env.LOG_LEVEL || 'info';
    const maxFileSize = parseInt(process.env.LOG_MAX_FILE_SIZE || '1024', 10);

    this.logger = createLogger({
      level: logLevel,
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: `${maxFileSize}k`,
          level: 'error',
        }),
        new transports.DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: `${maxFileSize}k`,
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
