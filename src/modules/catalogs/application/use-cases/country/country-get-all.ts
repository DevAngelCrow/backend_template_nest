import { Country } from 'src/modules/catalogs/domain/entities/country';
import { CountryRepository } from 'src/modules/catalogs/domain/repositories/country-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
export class CountryGetAll {
  constructor(protected readonly countryRepository: CountryRepository) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Country> | Country[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.countryRepository.getAll(paginationParams, filter);
    }
    return await this.countryRepository.getAll(undefined, filter);
  }
}
