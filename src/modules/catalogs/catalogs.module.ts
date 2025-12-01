import { Module } from '@nestjs/common';
import { CountryController } from './infrastructure/controllers/country.controller';
import { CountryCreate } from './application/use-cases/country/country-create';
import { CountryRepository } from './domain/repositories/country-repository';
import { ImplCountryRepository } from './infrastructure/implementation/impl-country.repository';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([{ path: 'catalogs', module: CatalogsModule }]),
  ],
  controllers: [CountryController],
  providers: [
    CountryCreate,
    { provide: CountryRepository, useClass: ImplCountryRepository },
  ],
  exports: [CountryCreate],
})
export class CatalogsModule {}
