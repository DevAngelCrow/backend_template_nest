import { Pagination } from '@/shared/domain/value-object/pagination';
import { MaritalStatus } from '../entities/marital-status';
import { MaritalStatusId } from '../value-objects/marital-status-value-object/marital-status-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class MaritalStatusRepository {
  abstract create(marital_status: MaritalStatus): Promise<void>;
  abstract update(marital_status: MaritalStatus): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<MaritalStatus> | MaritalStatus[]>;
  abstract getOneById(id: MaritalStatusId): Promise<MaritalStatus | null>;
  abstract delete(id: MaritalStatusId): Promise<void>;
}
