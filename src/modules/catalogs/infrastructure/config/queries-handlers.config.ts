import { Abstract, Type } from '@nestjs/common';
import { GetCountriesHandler } from '../../application/country/queries/get-countries/get-countries.handler';
import { GetCountryHandler } from '../../application/country/queries/get-country/get-country.handler';
import { GetDepartmentsHandler } from '../../application/department/queries/get-departments/get-departments.handler';
import { GetDepartmentHandler } from '../../application/department/queries/get-department/get-department.handler';
import { GetDistrictsHandler } from '../../application/district/queries/get-districts/get-districts.handler';
import { GetDistrictHandler } from '../../application/district/queries/get-district/get-district.handler';
import { GetMunicipalitiesHandler } from '../../application/municipality/queries/get-municipalities/get-municipalities.handler';
import { GetMunicipalityHandler } from '../../application/municipality/queries/get-municipality/get-municipality.handler';
import { GetGlobalStatusesHandler } from '../../application/global-status/queries/get-global-statuses/get-global-statuses.handler';
import { GetGlobalStatusHandler } from '../../application/global-status/queries/get-global-status/get-global-status.handler';
import { GetMaritalStatusesHandler } from '../../application/marital-status/queries/get-marital-statuses/get-marital-statuses.handler';
import { GetMaritalStatusHandler } from '../../application/marital-status/queries/get-marital-status/get-marital-status.handler';
import { CountryQueriesRepository } from '../../application/repositories/country-read.repository';
import { DepartmentQueriesRepository } from '../../application/repositories/department-read.repository';
import { DistrictQueriesRepository } from '../../application/repositories/district-read.repository';
import { MunicipalityQueriesRepository } from '../../application/repositories/municipality-read.repository';
import { GlobalStatusQueriesRepository } from '../../application/repositories/global-status-read.repository';
import { MaritalStatusQueriesRepository } from '../../application/repositories/marital-status-read.repository';
import { GetAllCountryQueryAdapter } from '../adapter/country/queries/get-all-query.adapter';
import { GetOneByIdCountryQueryAdapter } from '../adapter/country/queries/get-one-by-id-query.adapter';
import { GetAllDepartmentQueryAdapter } from '../adapter/department/queries/get-all-query.adapter';
import { GetOneByIdDepartmentQueryAdapter } from '../adapter/department/queries/get-one-by-id-query.adapter';
import { GetAllDistrictQueryAdapter } from '../adapter/district/queries/get-all-query.adapter';
import { GetOneByIdDistrictQueryAdapter } from '../adapter/district/queries/get-one-by-id-query.adapter';
import { GetAllMunicipalityQueryAdapter } from '../adapter/municipality/queries/get-all-query.adapter';
import { GetOneByIdMunicipalityQueryAdapter } from '../adapter/municipality/queries/get-one-by-id-query.adapter';
import { GetAllGlobalStatusQueryAdapter } from '../adapter/global-status/queries/get-all-query.adapter';
import { GetOneByIdGlobalStatusQueryAdapter } from '../adapter/global-status/queries/get-one-by-id-query.adapter';
import { GetAllMaritalStatusQueryAdapter } from '../adapter/marital-status/queries/get-all-query.adapter';
import { GetOneByIdMaritalStatusQueryAdapter } from '../adapter/marital-status/queries/get-one-by-id-query.adapter';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';

const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // Country
  {
    handler: GetCountriesHandler,
    deps: [CountryQueriesRepository],
  },
  {
    handler: GetCountryHandler,
    deps: [CountryQueriesRepository],
  },
  // Department
  {
    handler: GetDepartmentsHandler,
    deps: [DepartmentQueriesRepository],
  },
  {
    handler: GetDepartmentHandler,
    deps: [DepartmentQueriesRepository],
  },
  // District
  {
    handler: GetDistrictsHandler,
    deps: [DistrictQueriesRepository],
  },
  {
    handler: GetDistrictHandler,
    deps: [DistrictQueriesRepository],
  },
  // Municipality
  {
    handler: GetMunicipalitiesHandler,
    deps: [MunicipalityQueriesRepository],
  },
  {
    handler: GetMunicipalityHandler,
    deps: [MunicipalityQueriesRepository],
  },
  // GlobalStatus
  {
    handler: GetGlobalStatusesHandler,
    deps: [GlobalStatusQueriesRepository],
  },
  {
    handler: GetGlobalStatusHandler,
    deps: [GlobalStatusQueriesRepository],
  },
  // MaritalStatus
  {
    handler: GetMaritalStatusesHandler,
    deps: [MaritalStatusQueriesRepository],
  },
  {
    handler: GetMaritalStatusHandler,
    deps: [MaritalStatusQueriesRepository],
  },
];

export const queryAdapters = [
  GetAllCountryQueryAdapter,
  GetOneByIdCountryQueryAdapter,
  GetAllDepartmentQueryAdapter,
  GetOneByIdDepartmentQueryAdapter,
  GetAllDistrictQueryAdapter,
  GetOneByIdDistrictQueryAdapter,
  GetAllMunicipalityQueryAdapter,
  GetOneByIdMunicipalityQueryAdapter,
  GetAllGlobalStatusQueryAdapter,
  GetOneByIdGlobalStatusQueryAdapter,
  GetAllMaritalStatusQueryAdapter,
  GetOneByIdMaritalStatusQueryAdapter,
];

export const queryHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
