import { Module } from '@nestjs/common';
import { CountryController } from './infrastructure/controllers/country.controller';
import { CountryCreate } from './application/use-cases/country/country-create';
import { CountryRepository } from './domain/repositories/country-repository';
import { ImplCountryRepository } from './infrastructure/implementation/impl-country.repository';
import { APP_GUARD, RouterModule } from '@nestjs/core';
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
import { GlobalStatusController } from './infrastructure/controllers/global-status.controller';
import { GlobalStatusCreate } from './application/use-cases/global-status/global-status-create';
import { GlobalStatusUpdate } from './application/use-cases/global-status/global-status-update';
import { GlobalStatusDelete } from './application/use-cases/global-status/global-status-delete';
import { GlobalStatusGetAll } from './application/use-cases/global-status/global-status-get-all';
import { GlobalStatusGetOneById } from './application/use-cases/global-status/global-status-get-one-by-id';
import { ImplGlobalStatusRepository } from './infrastructure/implementation/impl-global-status.repository';
import { GlobalStatsusRepository } from './domain/repositories/global-status-repository';
import { MaritalStatusController } from './infrastructure/controllers/marital-status.controller';
import { MaritalStatusCreate } from './application/use-cases/marital-status/marital-status-create';
import { MaritalStatusUpdate } from './application/use-cases/marital-status/marital-status-update';
import { MaritalStatusDelete } from './application/use-cases/marital-status/marital-status-delete';
import { MaritalStatusGetAll } from './application/use-cases/marital-status/marital-status-get-all';
import { MaritalStatusGetOneById } from './application/use-cases/marital-status/marital-status-get-one-by-id';
import { ImplMaritalStatusRepository } from './infrastructure/implementation/impl-marital-status.repository';
import { MaritalStatusRepository } from './domain/repositories/marital-status-repository';
import { JwtPassportAuthGuard } from '../auth/infrastructure/guards/jwt-passport-auth.guard';

@Module({
  imports: [
    RouterModule.register([{ path: 'catalogs', module: CatalogsModule }]),
  ],
  controllers: [
    CountryController,
    DepartmentController,
    DistrictController,
    MunicipalityController,
    GlobalStatusController,
    MaritalStatusController,
  ],
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
    GlobalStatusCreate,
    GlobalStatusUpdate,
    GlobalStatusDelete,
    GlobalStatusGetAll,
    GlobalStatusGetOneById,
    MaritalStatusCreate,
    MaritalStatusUpdate,
    MaritalStatusDelete,
    MaritalStatusGetAll,
    MaritalStatusGetOneById,
    { provide: CountryRepository, useClass: ImplCountryRepository },
    { provide: DepartmentRepository, useClass: ImplDepartmentRepository },
    { provide: DistrictRepository, useClass: ImplDistrictRepository },
    { provide: MunicipalityRespository, useClass: ImplMunicipalityRepository },
    { provide: GlobalStatsusRepository, useClass: ImplGlobalStatusRepository },
    { provide: MaritalStatusRepository, useClass: ImplMaritalStatusRepository },
    { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
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
    GlobalStatusCreate,
    GlobalStatusUpdate,
    GlobalStatusDelete,
    GlobalStatusGetAll,
    GlobalStatusGetOneById,
    MaritalStatusCreate,
    MaritalStatusUpdate,
    MaritalStatusDelete,
    MaritalStatusGetAll,
    MaritalStatusGetOneById,
  ],
})
export class CatalogsModule {}
