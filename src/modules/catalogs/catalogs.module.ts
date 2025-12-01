import { Module } from '@nestjs/common';
import { CountryController } from './infrastructure/controllers/country.controller';
import { CountryCreate } from './application/use-cases/country/country-create';
import { CountryRepository } from './domain/repositories/country-repository';
import { ImplCountryRepository } from './infrastructure/implementation/impl-country.repository';
import { RouterModule } from '@nestjs/core';
import { CountryUpdate } from './application/use-cases/country/country-update';
import { CountryDelete } from './application/use-cases/country/country-delete';
import { CountryGetAll } from './application/use-cases/country/country-get-all';
import { CountryGetOneById } from './application/use-cases/country/country-get-one-by-id';

@Module({
  imports: [
    RouterModule.register([{ path: 'catalogs', module: CatalogsModule }]),
  ],
  controllers: [CountryController],
  providers: [
    CountryCreate,
    CountryUpdate,
    CountryDelete,
    CountryGetAll,
    CountryGetOneById,
    { provide: CountryRepository, useClass: ImplCountryRepository },
  ],
  exports: [
    CountryCreate,
    CountryUpdate,
    CountryDelete,
    CountryGetAll,
    CountryGetOneById,
  ],
})
export class CatalogsModule {}
