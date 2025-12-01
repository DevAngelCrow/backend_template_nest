export class ErrorResponseDto {
  statusCode: number;
  message: string;
  code?: string;
  type:
    | 'DOMAIN_ERROR'
    | 'APPLICATION_ERROR'
    | 'INFRASTRUCTURE_ERROR'
    | 'INTERNAL_ERROR';
  timestamp: string;
  path?: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
  constructor(
    statusCode: number,
    message: string,
    type: ErrorResponseDto['type'],
    code?: string,
    path?: string,
    errors?: Array<{ field?: string; message: string }>,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = type;
    this.code = code;
    this.path = path;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
  }
}
