import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class PaginationParamsDto {
  constructor(
    public readonly page: number,
    public readonly per_page: number,
  ) {}
  static fromDomain(pagination: PaginationParams): PaginationParamsDto {
    return new PaginationParamsDto(
      pagination.getPage().value(),
      pagination.getPerPage().value(),
    );
  }
}
