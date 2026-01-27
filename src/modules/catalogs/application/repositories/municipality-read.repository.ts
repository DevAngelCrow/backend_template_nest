import { Pagination } from '@/shared/domain/value-object/pagination';
import { Municipality } from '../../domain/entities/municipality';
import { MunicipalityId } from '../../domain/value-objects/municipality-value-object/municipality-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class MunicipalityQueriesRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Municipality> | Municipality[]>;
  abstract getOneById(id: MunicipalityId): Promise<Municipality | null>;
}
