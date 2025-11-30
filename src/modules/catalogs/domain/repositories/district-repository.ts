import { District } from '../entities/district';
import { DistrictId } from '../value-objects/district-value-object/district-id';

export abstract class DistrictRepository {
  abstract create(district: District): Promise<void>;
  abstract update(district: District): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<District[]>;
  abstract getOneById(id: DistrictId): Promise<District | null>;
  abstract delete(id: DistrictId): Promise<void>;
}
