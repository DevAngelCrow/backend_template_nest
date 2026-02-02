//import { Pagination } from '@/shared/domain/value-object/pagination';
import { Country } from '../entities/country';
import { CountryId } from '../value-objects/country-value-object/country-id';
//import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class CountryRepository {
  abstract create(country: Country): Promise<void>;
  abstract update(country: Country): Promise<void>;
  // abstract getAll(
  //   pagination_params?: PaginationParams,
  //   filter?: string,
  // ): Promise<Pagination<Country> | Country[]>;
  //abstract getOneById(id: CountryId): Promise<Country | null>;
  abstract delete(id: CountryId): Promise<void>;
}
