import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Rol } from '../../domain/entities/rol';
import { RolId } from '../../domain/value-objects/rol-value-object/rol-id';

export abstract class RolReadRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Rol> | Rol[]>;
  abstract getOneById(id: RolId): Promise<Rol | null>;
}
