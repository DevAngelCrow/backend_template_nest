import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Rol } from '../entities/rol';
import { Pagination } from '@/shared/domain/value-object/pagination';

export abstract class RolRepository {
  abstract create(rol: Rol): Promise<void>;
  abstract update(rol: Rol): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Rol> | Rol[]>;
  abstract getOneById(id: string): Promise<Rol | null>;
  abstract delete(id: string): Promise<void>;
}
