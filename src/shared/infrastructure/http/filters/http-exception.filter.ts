import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ExceptionMapper } from '../mappers/exception-mapper';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  stack?: string;
  originalError?: {
    name: string;
    message: string;
  };
  [key: string]: unknown;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  private readonly isDevelopment: boolean;
  private readonly showStackTrace: boolean;
  constructor(private readonly configService?: ConfigService) {
    this.isDevelopment =
      this.configService?.get('NODE_ENV') === 'development' ||
      process.env.NODE_ENV === 'development';
    this.showStackTrace =
      this.configService?.get('SHOW_STACK_TRACE') === 'true' ||
      this.isDevelopment;
  }
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpException: HttpException;
    if (exception instanceof HttpException) {
      httpException = exception;
    } else {
      httpException = ExceptionMapper.toHttpException(exception, request.url);
    }
    const status = httpException.getStatus();
    const exceptionResponse = httpException.getResponse();

    // Convertir a objeto si es necesario
    let responseBody: ErrorResponse;
    if (typeof exceptionResponse === 'string') {
      responseBody = {
        statusCode: status,
        message: exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else {
      responseBody = { ...exceptionResponse } as ErrorResponse;
    }

    // Agregar stacktrace si está habilitado
    if (this.showStackTrace && exception.stack) {
      responseBody.stack = exception.stack;
      responseBody.originalError = {
        name: exception.name,
        message: exception.message,
      };
    }

    this.logException(exception, request, status);

    response.status(status).json(responseBody);
  }
  private logException(
    exception: Error,
    request: Request,
    status: number,
  ): void {
    const logContext = {
      method: request.method,
      url: request.url,
      status,
      errorName: exception.name,
      errorMessage: exception.message,
      user:
        (request as Request & { user?: { id: string } }).user?.id ||
        'anonymous',
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    };

    if (status >= 500) {
      this.logger.error(
        `Server Error: ${exception.message}`,
        exception.stack,
        JSON.stringify(logContext),
      );
    } else if (status >= 400) {
      this.logger.warn(
        `Client Error: ${exception.message}`,
        JSON.stringify(logContext),
      );
    }
  }
}
