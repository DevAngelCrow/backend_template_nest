import { Pagination } from '@/shared/domain/value-object/pagination';
import { District } from '../../domain/entities/district';
import { DistrictId } from '../../domain/value-objects/district-value-object/district-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class DistrictQueriesRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<District> | District[]>;
  abstract getOneById(id: DistrictId): Promise<District | null>;
}
