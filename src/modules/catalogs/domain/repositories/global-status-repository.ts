import { Pagination } from '@/shared/domain/value-object/pagination';
import { GlobalStatus } from '../entities/global-status';
import { GlobalStatusId } from '../value-objects/goblal-status-value-object/global-status-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class GlobalStatsusRepository {
  abstract create(global_status: GlobalStatus): Promise<void>;
  abstract update(global_status: GlobalStatus): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<GlobalStatus> | GlobalStatus[]>;
  abstract getOneById(id: GlobalStatusId): Promise<GlobalStatus | null>;
  abstract delete(id: GlobalStatusId): Promise<void>;
}
