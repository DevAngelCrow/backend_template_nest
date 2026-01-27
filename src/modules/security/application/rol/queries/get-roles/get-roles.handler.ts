import { Pagination } from '@/shared/domain/value-object/pagination';
import { Rol } from '@/modules/security/domain/entities/rol';
import { GetRolesQuery } from './get-roles.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';

export class GetRolesHandler {
  constructor(private readonly repository: RolRepository) {}
  async execute(query: GetRolesQuery): Promise<Pagination<Rol> | Rol[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
