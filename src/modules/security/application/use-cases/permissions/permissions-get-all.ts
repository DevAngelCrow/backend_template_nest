import { Permissions } from '@/modules/security/domain/entities/permissions';
import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class PermissionsGetAll {
  constructor(protected readonly repository: PermissionsRepository) {}
  async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Permissions> | Permissions[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.repository.getAll(paginationParams, filter);
    }
    return await this.repository.getAll(undefined, filter);
  }
}
