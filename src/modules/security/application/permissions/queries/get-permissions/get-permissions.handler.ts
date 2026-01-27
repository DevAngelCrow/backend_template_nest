import { Pagination } from '@/shared/domain/value-object/pagination';
import { Permissions } from '@/modules/security/domain/entities/permissions';
import { GetPermissionsQuery } from './get-permissions.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';

export class GetPermissionsHandler {
  constructor(private readonly repository: PermissionsRepository) {}
  async execute(
    query: GetPermissionsQuery,
  ): Promise<Pagination<Permissions> | Permissions[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
