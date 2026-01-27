import { CountryQueriesRepository } from '../../application/repositories/country-read.repository';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { DepartmentRepository } from '../../domain/repositories/department-repository';
import { DistrictRepository } from '../../domain/repositories/district-repository';
import { GlobalStatsusRepository } from '../../domain/repositories/global-status-repository';
import { MaritalStatusRepository } from '../../domain/repositories/marital-status-repository';
import { MunicipalityRespository } from '../../domain/repositories/municipality-repository';
import { ImplCountryRepository } from '../implementation/country/impl-country.repository';
import { ImplDepartmentRepository } from '../implementation/impl-department.repository';
import { ImplDistrictRepository } from '../implementation/impl-district.repository';
import { ImplGlobalStatusRepository } from '../implementation/impl-global-status.repository';
import { ImplMaritalStatusRepository } from '../implementation/impl-marital-status.repository';
import { ImplMunicipalityRepository } from '../implementation/impl-municipality.repository';

export const repositories = [
  { provide: CountryRepository, useClass: ImplCountryRepository },
  { provide: DepartmentRepository, useClass: ImplDepartmentRepository },
  { provide: DistrictRepository, useClass: ImplDistrictRepository },
  { provide: MunicipalityRespository, useClass: ImplMunicipalityRepository },
  { provide: GlobalStatsusRepository, useClass: ImplGlobalStatusRepository },
  { provide: MaritalStatusRepository, useClass: ImplMaritalStatusRepository },
  { provide: CountryQueriesRepository, useClass: ImplCountryRepository },
];
