import { Municipality } from '../entities/municipality';
import { MunicipalityId } from '../value-objects/municipality-value-object/municipality-id';

export abstract class MunicipalityRespository {
  abstract create(municipality: Municipality): Promise<void>;
  abstract update(municipality: Municipality): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<Municipality[]>;
  abstract getOneById(id: MunicipalityId): Promise<Municipality | null>;
  abstract delete(id: MunicipalityId): Promise<void>;
}
