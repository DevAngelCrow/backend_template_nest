import { Pagination } from '@/shared/domain/value-object/pagination';
import { District } from '../entities/district';
import { DistrictId } from '../value-objects/district-value-object/district-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class DistrictRepository {
  abstract create(district: District): Promise<void>;
  abstract update(district: District): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<District> | District[]>;
  abstract getOneById(id: DistrictId): Promise<District | null>;
  abstract delete(id: DistrictId): Promise<void>;
}
