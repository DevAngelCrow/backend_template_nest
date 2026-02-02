import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

import { Permissions } from '../../domain/entities/permissions';
import { PermissionsId } from '../../domain/value-objects/permissions-value-object/permissions-id';

export abstract class PermissionsReadRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Permissions> | Permissions[]>;
  abstract getOneById(id: PermissionsId): Promise<Permissions | null>;
}
