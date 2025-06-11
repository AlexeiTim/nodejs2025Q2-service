import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { LoggingService } from './logging/logging.service';
import { HttpExceptionFilter } from './logging/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggingService = app.get(LoggingService);
  app.useLogger(loggingService);

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception', error.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', String(reason));
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new JwtAuthGuard(app.get(JwtService), app.get(Reflector)),
  );
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
