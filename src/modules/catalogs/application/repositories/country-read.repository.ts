import { Pagination } from '@/shared/domain/value-object/pagination';
import { Country } from '../../domain/entities/country';
import { CountryId } from '../../domain/value-objects/country-value-object/country-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class CountryQueriesRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Country> | Country[]>;
  abstract getOneById(id: CountryId): Promise<Country | null>;
}
