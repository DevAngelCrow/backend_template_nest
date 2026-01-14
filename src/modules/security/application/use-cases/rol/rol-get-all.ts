import { Rol } from '@/modules/security/domain/entities/rol';
import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class RolGetAll {
  constructor(protected readonly repository: RolRepository) {}
  async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Rol> | Rol[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.repository.getAll(paginationParams, filter);
    }
    return await this.repository.getAll(undefined, filter);
  }
}
