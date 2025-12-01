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
import { DepartmentController } from './infrastructure/controllers/department.controller';
import { DepartmentCreate } from './application/use-cases/department/department-create';
import { DepartmentGetOneById } from './application/use-cases/department/department-get-one-by-id';
import { DepartmentGetAll } from './application/use-cases/department/department-get-all';
import { DepartmentDelete } from './application/use-cases/department/department-delete';
import { DepartmentUpdate } from './application/use-cases/department/department-update';
import { ImplDepartmentRepository } from './infrastructure/implementation/impl-department.repository';
import { DepartmentRepository } from './domain/repositories/department-repository';

@Module({
  imports: [
    RouterModule.register([{ path: 'catalogs', module: CatalogsModule }]),
  ],
  controllers: [CountryController, DepartmentController],
  providers: [
    CountryCreate,
    CountryUpdate,
    CountryDelete,
    CountryGetAll,
    CountryGetOneById,
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentDelete,
    DepartmentGetAll,
    DepartmentGetOneById,
    { provide: CountryRepository, useClass: ImplCountryRepository },
    { provide: DepartmentRepository, useClass: ImplDepartmentRepository },
  ],
  exports: [
    CountryCreate,
    CountryUpdate,
    CountryDelete,
    CountryGetAll,
    CountryGetOneById,
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentDelete,
    DepartmentGetAll,
    DepartmentGetOneById,
  ],
})
export class CatalogsModule {}
