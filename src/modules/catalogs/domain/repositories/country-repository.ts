import { Country } from '../entities/country';
import { CountryId } from '../value-objects/country-value-object/country-id';

export abstract class CountryRepository {
  abstract create(country: Country): Promise<void>;
  abstract update(country: Country): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ countries: Country[]; total: number }>;
  abstract getOneById(id: CountryId): Promise<Country | null>;
  abstract delete(id: CountryId): Promise<void>;
}
