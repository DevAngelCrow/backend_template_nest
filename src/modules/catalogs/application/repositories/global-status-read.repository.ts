import { Pagination } from '@/shared/domain/value-object/pagination';
import { GlobalStatus } from '../../domain/entities/global-status';
import { GlobalStatusId } from '../../domain/value-objects/goblal-status-value-object/global-status-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class GlobalStatusQueriesRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<GlobalStatus> | GlobalStatus[]>;
  abstract getOneById(id: GlobalStatusId): Promise<GlobalStatus | null>;
}
