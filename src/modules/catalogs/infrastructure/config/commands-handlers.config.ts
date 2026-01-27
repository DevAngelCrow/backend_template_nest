import { Abstract, Type } from '@nestjs/common';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { DepartmentRepository } from '../../domain/repositories/department-repository';
import { DistrictRepository } from '../../domain/repositories/district-repository';
import { MunicipalityRespository } from '../../domain/repositories/municipality-repository';
import { GlobalStatsusRepository } from '../../domain/repositories/global-status-repository';
import { MaritalStatusRepository } from '../../domain/repositories/marital-status-repository';
import { CreateCountryHandler } from '../../application/country/commands/create-country/create-country.handler';
import { UpdateCountryHandler } from '../../application/country/commands/update-country/update-country.handler';
import { DeleteCountryHandler } from '../../application/country/commands/delete-country/delete-country.handler';
import { CreateDepartmentHandler } from '../../application/department/commands/create-department/create-department.handler';
import { UpdateDepartmentHandler } from '../../application/department/commands/update-department/update-department.handler';
import { DeleteDepartmentHandler } from '../../application/department/commands/delete-department/delete-department.handler';
import { CreateDistrictHandler } from '../../application/district/commands/create-district/create-district.handler';
import { UpdateDistrictHandler } from '../../application/district/commands/update-district/update-district.handler';
import { DeleteDistrictHandler } from '../../application/district/commands/delete-district/delete-district.handler';
import { CreateMunicipalityHandler } from '../../application/municipality/commands/create-municipality/create-municipality.handler';
import { UpdateMunicipalityHandler } from '../../application/municipality/commands/update-municipality/update-municipality.handler';
import { DeleteMunicipalityHandler } from '../../application/municipality/commands/delete-municipality/delete-municipality.handler';
import { CreateGlobalStatusHandler } from '../../application/global-status/commands/create-global-status/create-global-status.handler';
import { UpdateGlobalStatusHandler } from '../../application/global-status/commands/update-global-status/update-global-status.handler';
import { DeleteGlobalStatusHandler } from '../../application/global-status/commands/delete-global-status/delete-global-status.handler';
import { CreateMaritalStatusHandler } from '../../application/marital-status/commands/create-marital-status/create-marital-status.handler';
import { UpdateMaritalStatusHandler } from '../../application/marital-status/commands/update-marital-status/update-marital-status.handler';
import { DeleteMaritalStatusHandler } from '../../application/marital-status/commands/delete-marital-status/delete-marital-status.handler';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { CreateCountryCommandAdapter } from '../adapter/country/commands/create-country-command.adapter';
import { UpdateCountryCommandAdapter } from '../adapter/country/commands/update-country-command.adapter';
import { DeleteCountryCommandAdapter } from '../adapter/country/commands/delete-country-command.adapter';
import { CreateDepartmentCommandAdapter } from '../adapter/department/commands/create-department-command.adapter';
import { UpdateDepartmentCommandAdapter } from '../adapter/department/commands/update-department-command.adapter';
import { DeleteDepartmentCommandAdapter } from '../adapter/department/commands/delete-department-command.adapter';
import { CreateDistrictCommandAdapter } from '../adapter/district/commands/create-district-command.adapter';
import { UpdateDistrictCommandAdapter } from '../adapter/district/commands/update-district-command.adapter';
import { DeleteDistrictCommandAdapter } from '../adapter/district/commands/delete-district-command.adapter';
import { CreateMunicipalityCommandAdapter } from '../adapter/municipality/commands/create-municipality-command.adapter';
import { UpdateMunicipalityCommandAdapter } from '../adapter/municipality/commands/update-municipality-command.adapter';
import { DeleteMunicipalityCommandAdapter } from '../adapter/municipality/commands/delete-municipality-command.adapter';
import { CreateGlobalStatusCommandAdapter } from '../adapter/global-status/commands/create-global-status-command.adapter';
import { UpdateGlobalStatusCommandAdapter } from '../adapter/global-status/commands/update-global-status-command.adapter';
import { DeleteGlobalStatusCommandAdapter } from '../adapter/global-status/commands/delete-global-status-command.adapter';
import { CreateMaritalStatusCommandAdapter } from '../adapter/marital-status/commands/create-marital-status-command.adapter';
import { UpdateMaritalStatusCommandAdapter } from '../adapter/marital-status/commands/update-marital-status-command.adapter';
import { DeleteMaritalStatusCommandAdapter } from '../adapter/marital-status/commands/delete-marital-status-command.adapter';
import { CountryQueriesRepository } from '../../application/repositories/country-read.repository';
import { DepartmentQueriesRepository } from '../../application/repositories/department-read.repository';
import { DistrictQueriesRepository } from '../../application/repositories/district-read.repository';
import { MunicipalityQueriesRepository } from '../../application/repositories/municipality-read.repository';
import { GlobalStatusQueriesRepository } from '../../application/repositories/global-status-read.repository';
import { MaritalStatusQueriesRepository } from '../../application/repositories/marital-status-read.repository';

// Application Handlers Registration
export const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // Country
  {
    handler: CreateCountryHandler,
    deps: [CountryRepository],
  },
  {
    handler: UpdateCountryHandler,
    deps: [CountryRepository, CountryQueriesRepository],
  },
  {
    handler: DeleteCountryHandler,
    deps: [CountryRepository, CountryQueriesRepository],
  },
  // Department
  {
    handler: CreateDepartmentHandler,
    deps: [DepartmentRepository],
  },
  {
    handler: UpdateDepartmentHandler,
    deps: [DepartmentRepository, DepartmentQueriesRepository],
  },
  {
    handler: DeleteDepartmentHandler,
    deps: [DepartmentRepository, DepartmentQueriesRepository],
  },
  // District
  {
    handler: CreateDistrictHandler,
    deps: [DistrictRepository],
  },
  {
    handler: UpdateDistrictHandler,
    deps: [DistrictRepository, DistrictQueriesRepository],
  },
  {
    handler: DeleteDistrictHandler,
    deps: [DistrictRepository, DistrictQueriesRepository],
  },
  // Municipality
  {
    handler: CreateMunicipalityHandler,
    deps: [MunicipalityRespository],
  },
  {
    handler: UpdateMunicipalityHandler,
    deps: [MunicipalityRespository, MunicipalityQueriesRepository],
  },
  {
    handler: DeleteMunicipalityHandler,
    deps: [MunicipalityRespository, MunicipalityQueriesRepository],
  },
  // GlobalStatus
  {
    handler: CreateGlobalStatusHandler,
    deps: [GlobalStatsusRepository],
  },
  {
    handler: UpdateGlobalStatusHandler,
    deps: [GlobalStatsusRepository, GlobalStatusQueriesRepository],
  },
  {
    handler: DeleteGlobalStatusHandler,
    deps: [GlobalStatsusRepository, GlobalStatusQueriesRepository],
  },
  // MaritalStatus
  {
    handler: CreateMaritalStatusHandler,
    deps: [MaritalStatusRepository],
  },
  {
    handler: UpdateMaritalStatusHandler,
    deps: [MaritalStatusRepository, MaritalStatusQueriesRepository],
  },
  {
    handler: DeleteMaritalStatusHandler,
    deps: [MaritalStatusRepository, MaritalStatusQueriesRepository],
  },
];

// CQRS NestJS Adapters (Infrastructure) Registration
export const commandAdapters = [
  CreateCountryCommandAdapter,
  UpdateCountryCommandAdapter,
  DeleteCountryCommandAdapter,
  CreateDepartmentCommandAdapter,
  UpdateDepartmentCommandAdapter,
  DeleteDepartmentCommandAdapter,
  CreateDistrictCommandAdapter,
  UpdateDistrictCommandAdapter,
  DeleteDistrictCommandAdapter,
  CreateMunicipalityCommandAdapter,
  UpdateMunicipalityCommandAdapter,
  DeleteMunicipalityCommandAdapter,
  CreateGlobalStatusCommandAdapter,
  UpdateGlobalStatusCommandAdapter,
  DeleteGlobalStatusCommandAdapter,
  CreateMaritalStatusCommandAdapter,
  UpdateMaritalStatusCommandAdapter,
  DeleteMaritalStatusCommandAdapter,
];

export const commandHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
