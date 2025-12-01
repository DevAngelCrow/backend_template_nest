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
import { DistrictCreate } from './application/use-cases/district/district-create';
import { DistrictGetOneById } from './application/use-cases/district/district-get-one-by-id';
import { ImplDistrictRepository } from './infrastructure/implementation/impl-district.repository';
import { DistrictRepository } from './domain/repositories/district-repository';
import { DistrictGetAll } from './application/use-cases/district/district-get-all';
import { DistrictDelete } from './application/use-cases/district/district-delete';
import { DistrictUpdate } from './application/use-cases/district/district-update';
import { DistrictController } from './infrastructure/controllers/district.controller';
import { MunicipalityController } from './infrastructure/controllers/municipality.controller';
import { MunicipalityCreate } from './application/use-cases/municipality/municipality-create';
import { MunicipalityUpdate } from './application/use-cases/municipality/municipality-update';
import { MunicipalityDelete } from './application/use-cases/municipality/municipality-delete';
import { MunicipalityGetAll } from './application/use-cases/municipality/municipality-get-all';
import { MunicipalityGetOneById } from './application/use-cases/municipality/municipality-get-one-by-id';
import { ImplMunicipalityRepository } from './infrastructure/implementation/impl-municipality.repository';
import { MunicipalityRespository } from './domain/repositories/municipality-repository';

@Module({
  imports: [
    RouterModule.register([{ path: 'catalogs', module: CatalogsModule }]),
  ],
  controllers: [CountryController, DepartmentController, DistrictController, MunicipalityController],
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
    DistrictCreate,
    DistrictUpdate,
    DistrictDelete,
    DistrictGetAll,
    DistrictGetOneById,
    MunicipalityCreate,
    MunicipalityUpdate,
    MunicipalityDelete,
    MunicipalityGetAll,
    MunicipalityGetOneById,
    { provide: CountryRepository, useClass: ImplCountryRepository },
    { provide: DepartmentRepository, useClass: ImplDepartmentRepository },
    { provide: DistrictRepository, useClass: ImplDistrictRepository },
    { provide: MunicipalityRespository, useClass: ImplMunicipalityRepository },
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
    DistrictCreate,
    DistrictUpdate,
    DistrictDelete,
    DistrictGetAll,
    DistrictGetOneById,
    MunicipalityCreate,
    MunicipalityUpdate,
    MunicipalityDelete,
    MunicipalityGetAll,
    MunicipalityGetOneById,
  ],
})
export class CatalogsModule {}
