import { HttpException, HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { ApplicationException } from 'src/shared/application/exceptions/application.exception';
import { InfrastructureException } from '../../exceptions/infrastructure.exception';
import { NotFoundException } from 'src/shared/domain/exceptions/not-found.exception';
import { ConflictException } from '@/shared/domain/exceptions/conflict-exception';
import { ValidationException } from 'src/shared/domain/exceptions/validation.exception';
import { UnauthorizedException } from 'src/shared/application/exceptions/unauthorized.exception';
import { ForbiddenException } from 'src/shared/application/exceptions/forbidden.exception';
import { DatabaseException } from '../../exceptions/database.exception';
import { ExternalServiceException } from '../../exceptions/external-service.exception';
import { ErrorResponseDto } from '../dtos/http-error-response.dto';

export class ExceptionMapper {
  private static readonly DOMAIN_STATUS_MAP = new Map<string, HttpStatus>([
    [NotFoundException.name, HttpStatus.NOT_FOUND],
    [ConflictException.name, HttpStatus.CONFLICT],
    [ValidationException.name, HttpStatus.BAD_REQUEST],
  ]);

  private static readonly APPLICATION_STATUS_MAP = new Map<string, HttpStatus>([
    [UnauthorizedException.name, HttpStatus.UNAUTHORIZED],
    [ForbiddenException.name, HttpStatus.FORBIDDEN],
  ]);

  private static readonly INFRASTRUCTURE_STATUS_MAP = new Map<
    string,
    HttpStatus
  >([
    [DatabaseException.name, HttpStatus.SERVICE_UNAVAILABLE],
    [ExternalServiceException.name, HttpStatus.BAD_GATEWAY],
  ]);

  static toHttpException(error: Error, path?: string): HttpException {
    if (error instanceof DomainException) {
      return this.mapDomainException(error, path);
    }

    if (error instanceof ApplicationException) {
      return this.mapApplicationException(error, path);
    }

    if (error instanceof InfrastructureException) {
      return this.mapInfrastructureException(error, path);
    }

    return this.mapUnknownException(error, path);
  }

  private static mapDomainException(
    error: DomainException,
    path?: string,
  ): HttpException {
    const status =
      this.DOMAIN_STATUS_MAP.get(error.constructor.name) ??
      HttpStatus.BAD_REQUEST;

    const response = new ErrorResponseDto(
      status,
      error.message,
      'DOMAIN_ERROR',
      error.constructor.name.replace('Exception', '').toUpperCase(),
      path,
    );

    return new HttpException(response, status);
  }

  private static mapApplicationException(
    error: ApplicationException,
    path?: string,
  ): HttpException {
    const status =
      this.APPLICATION_STATUS_MAP.get(error.constructor.name) ??
      HttpStatus.BAD_REQUEST;

    const response = new ErrorResponseDto(
      status,
      error.message,
      'APPLICATION_ERROR',
      error.code,
      path,
    );

    return new HttpException(response, status);
  }

  private static mapInfrastructureException(
    error: InfrastructureException,
    path?: string,
  ): HttpException {
    const status =
      this.INFRASTRUCTURE_STATUS_MAP.get(error.constructor.name) ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    const response = new ErrorResponseDto(
      status,
      error.message,
      'INFRASTRUCTURE_ERROR',
      error.code,
      path,
    );

    return new HttpException(response, status);
  }

  private static mapUnknownException(
    error: Error,
    path?: string,
  ): HttpException {
    const response = new ErrorResponseDto(
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error',
      'INTERNAL_ERROR',
      'INTERNAL_SERVER_ERROR',
      path,
    );

    return new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
