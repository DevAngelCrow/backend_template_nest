import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Permissions } from '../entities/permissions';
import { PermissionsId } from '../value-objects/permissions-value-object/permissions-id';
import { Pagination } from '@/shared/domain/value-object/pagination';

export abstract class PermissionsRepository {
  abstract create(permission: Permissions): Promise<void>;
  abstract update(permission: Permissions): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Permissions> | Permissions[]>;
  abstract getOneById(id: PermissionsId): Promise<Permissions | null>;
  abstract delete(id: PermissionsId): Promise<void>;
}
