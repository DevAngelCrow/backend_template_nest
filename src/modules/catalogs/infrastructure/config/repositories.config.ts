import { CountryQueriesRepository } from '../../application/repositories/country-read.repository';
import { DepartmentQueriesRepository } from '../../application/repositories/department-read.repository';
import { DistrictQueriesRepository } from '../../application/repositories/district-read.repository';
import { MunicipalityQueriesRepository } from '../../application/repositories/municipality-read.repository';
import { GlobalStatusQueriesRepository } from '../../application/repositories/global-status-read.repository';
import { MaritalStatusQueriesRepository } from '../../application/repositories/marital-status-read.repository';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { DepartmentRepository } from '../../domain/repositories/department-repository';
import { DistrictRepository } from '../../domain/repositories/district-repository';
import { GlobalStatsusRepository } from '../../domain/repositories/global-status-repository';
import { MaritalStatusRepository } from '../../domain/repositories/marital-status-repository';
import { MunicipalityRespository } from '../../domain/repositories/municipality-repository';
import { ImplCountryRepository } from '../implementation/country/impl-country.repository';
import { ImplDepartmentRepository } from '../implementation/department/impl-department.repository';
import { ImplDistrictRepository } from '../implementation/district/impl-district.repository';
import { ImplGlobalStatusRepository } from '../implementation/global-status/impl-global-status.repository';
import { ImplMaritalStatusRepository } from '../implementation/marital-status/impl-marital-status.repository';
import { ImplMunicipalityRepository } from '../implementation/municipality/impl-municipality.repository';

export const repositories = [
  { provide: CountryRepository, useClass: ImplCountryRepository },
  { provide: CountryQueriesRepository, useClass: ImplCountryRepository },
  { provide: DepartmentRepository, useClass: ImplDepartmentRepository },
  { provide: DepartmentQueriesRepository, useClass: ImplDepartmentRepository },
  { provide: DistrictRepository, useClass: ImplDistrictRepository },
  { provide: DistrictQueriesRepository, useClass: ImplDistrictRepository },
  { provide: MunicipalityRespository, useClass: ImplMunicipalityRepository },
  {
    provide: MunicipalityQueriesRepository,
    useClass: ImplMunicipalityRepository,
  },
  { provide: GlobalStatsusRepository, useClass: ImplGlobalStatusRepository },
  {
    provide: GlobalStatusQueriesRepository,
    useClass: ImplGlobalStatusRepository,
  },
  { provide: MaritalStatusRepository, useClass: ImplMaritalStatusRepository },
  {
    provide: MaritalStatusQueriesRepository,
    useClass: ImplMaritalStatusRepository,
  },
];
