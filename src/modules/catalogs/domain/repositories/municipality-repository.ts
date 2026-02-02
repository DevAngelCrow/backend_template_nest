import { Pagination } from '@/shared/domain/value-object/pagination';
import { Municipality } from '../entities/municipality';
import { MunicipalityId } from '../value-objects/municipality-value-object/municipality-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class MunicipalityRespository {
  abstract create(municipality: Municipality): Promise<void>;
  abstract update(municipality: Municipality): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Municipality> | Municipality[]>;
  abstract getOneById(id: MunicipalityId): Promise<Municipality | null>;
  abstract delete(id: MunicipalityId): Promise<void>;
}
