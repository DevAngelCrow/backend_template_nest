import { Pagination } from '@/shared/domain/value-object/pagination';
import { MaritalStatus } from '../../domain/entities/marital-status';
import { MaritalStatusId } from '../../domain/value-objects/marital-status-value-object/marital-status-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class MaritalStatusQueriesRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<MaritalStatus> | MaritalStatus[]>;
  abstract getOneById(id: MaritalStatusId): Promise<MaritalStatus | null>;
}
