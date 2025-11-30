import { HttpException, HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { ApplicationException } from 'src/shared/application/exceptions/application.exception';
import { InfrastructureException } from '../infrastructure.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class ExceptionMapper {
  private static readonly DOMAIN_STATUS_MAP = new Map<string, HttpStatus>([
    [Validator.name, HttpStatus.BAD_REQUEST],
  ]);

  private static readonly APPLICATION_STATUS_MAP = new Map<string, HttpStatus>([
    // [BusinessRuleException.name, HttpStatus.UNPROCESSABLE_ENTITY],
  ]);

  private static readonly INFRASTRUCTURE_STATUS_MAP = new Map<
    string,
    HttpStatus
  >([
    // [DatabaseException.name, HttpStatus.SERVICE_UNAVAILABLE],
    // [ExternalServiceException.name, HttpStatus.BAD_GATEWAY],
  ]);

  static toHttpException(error: Error): HttpException {
    // Domain Exceptions
    if (error instanceof DomainException) {
      return this.mapDomainException(error);
    }

    // Application Exceptions
    if (error instanceof ApplicationException) {
      return this.mapApplicationException(error);
    }

    // Infrastructure Exceptions
    if (error instanceof InfrastructureException) {
      return this.mapInfrastructureException(error);
    }

    // Errores no controlados
    return new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private static mapDomainException(error: DomainException): HttpException {
    const status =
      this.DOMAIN_STATUS_MAP.get(error.constructor.name) ||
      HttpStatus.BAD_REQUEST;

    return new HttpException(
      {
        statusCode: status,
        message: error.message,
        //code: error.code,
        type: 'DOMAIN_ERROR',
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }

  private static mapApplicationException(
    error: ApplicationException,
  ): HttpException {
    const status =
      this.APPLICATION_STATUS_MAP.get(error.constructor.name) ||
      HttpStatus.BAD_REQUEST;

    return new HttpException(
      {
        statusCode: status,
        message: error.message,
        code: error.code,
        type: 'APPLICATION_ERROR',
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }

  private static mapInfrastructureException(
    error: InfrastructureException,
  ): HttpException {
    const status =
      this.INFRASTRUCTURE_STATUS_MAP.get(error.constructor.name) ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    return new HttpException(
      {
        statusCode: status,
        message: error.message,
        code: error.code,
        type: 'INFRASTRUCTURE_ERROR',
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}
