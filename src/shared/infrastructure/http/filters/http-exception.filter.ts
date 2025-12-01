import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ExceptionMapper } from '../mappers/exception-mapper';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let httpException: HttpException;
    if (exception instanceof HttpException) {
      httpException = exception;
    } else {
      httpException = ExceptionMapper.toHttpException(exception, request.url);
    }
    const status = httpException.getStatus();
    const exceptionResponse = httpException.getResponse();
    response.status(status).json(exceptionResponse);
  }
}
