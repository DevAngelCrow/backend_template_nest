import { registerUseCase } from '@/shared/infrastructure/factories/register-use-case.factory';
import { CountryCreate } from '../../application/use-cases/country/country-create';
import { CountryDelete } from '../../application/use-cases/country/country-delete';
import { CountryGetAll } from '../../application/use-cases/country/country-get-all';
import { CountryGetOneById } from '../../application/use-cases/country/country-get-one-by-id';
import { CountryUpdate } from '../../application/use-cases/country/country-update';
import { DepartmentCreate } from '../../application/use-cases/department/department-create';
import { DepartmentDelete } from '../../application/use-cases/department/department-delete';
import { DepartmentGetAll } from '../../application/use-cases/department/department-get-all';
import { DepartmentGetOneById } from '../../application/use-cases/department/department-get-one-by-id';
import { DepartmentUpdate } from '../../application/use-cases/department/department-update';
import { DistrictCreate } from '../../application/use-cases/district/district-create';
import { DistrictDelete } from '../../application/use-cases/district/district-delete';
import { DistrictGetAll } from '../../application/use-cases/district/district-get-all';
import { DistrictGetOneById } from '../../application/use-cases/district/district-get-one-by-id';
import { DistrictUpdate } from '../../application/use-cases/district/district-update';
import { GlobalStatusCreate } from '../../application/use-cases/global-status/global-status-create';
import { GlobalStatusDelete } from '../../application/use-cases/global-status/global-status-delete';
import { GlobalStatusGetAll } from '../../application/use-cases/global-status/global-status-get-all';
import { GlobalStatusGetOneById } from '../../application/use-cases/global-status/global-status-get-one-by-id';
import { GlobalStatusUpdate } from '../../application/use-cases/global-status/global-status-update';
import { MaritalStatusCreate } from '../../application/use-cases/marital-status/marital-status-create';
import { MaritalStatusDelete } from '../../application/use-cases/marital-status/marital-status-delete';
import { MaritalStatusGetAll } from '../../application/use-cases/marital-status/marital-status-get-all';
import { MaritalStatusGetOneById } from '../../application/use-cases/marital-status/marital-status-get-one-by-id';
import { MaritalStatusUpdate } from '../../application/use-cases/marital-status/marital-status-update';
import { MunicipalityCreate } from '../../application/use-cases/municipality/municipality-create';
import { MunicipalityDelete } from '../../application/use-cases/municipality/municipality-delete';
import { MunicipalityGetAll } from '../../application/use-cases/municipality/municipality-get-all';
import { MunicipalityGetOneById } from '../../application/use-cases/municipality/municipality-get-one-by-id';
import { MunicipalityUpdate } from '../../application/use-cases/municipality/municipality-update';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { DepartmentRepository } from '../../domain/repositories/department-repository';
import { DistrictRepository } from '../../domain/repositories/district-repository';
import { GlobalStatsusRepository } from '../../domain/repositories/global-status-repository';
import { MaritalStatusRepository } from '../../domain/repositories/marital-status-repository';
import { MunicipalityRespository } from '../../domain/repositories/municipality-repository';
import { Abstract, Type } from '@nestjs/common';

export const useCases: Array<{
  useCase: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    useCase: CountryCreate,
    deps: [CountryRepository],
  },
  {
    useCase: CountryUpdate,
    deps: [CountryRepository],
  },
  {
    useCase: CountryDelete,
    deps: [CountryRepository],
  },
  {
    useCase: CountryGetAll,
    deps: [CountryRepository],
  },
  {
    useCase: CountryGetOneById,
    deps: [CountryRepository],
  },
  {
    useCase: DepartmentCreate,
    deps: [DepartmentRepository],
  },
  {
    useCase: DepartmentUpdate,
    deps: [DepartmentRepository],
  },
  {
    useCase: DepartmentDelete,
    deps: [DepartmentRepository],
  },
  {
    useCase: DepartmentGetAll,
    deps: [DepartmentRepository],
  },
  {
    useCase: DepartmentGetOneById,
    deps: [DepartmentRepository],
  },
  {
    useCase: MunicipalityCreate,
    deps: [MunicipalityRespository],
  },
  {
    useCase: MunicipalityUpdate,
    deps: [MunicipalityRespository],
  },
  {
    useCase: MunicipalityDelete,
    deps: [MunicipalityRespository],
  },
  {
    useCase: MunicipalityGetAll,
    deps: [MunicipalityRespository],
  },
  {
    useCase: MunicipalityGetOneById,
    deps: [MunicipalityRespository],
  },
  {
    useCase: DistrictCreate,
    deps: [DistrictRepository],
  },
  {
    useCase: DistrictUpdate,
    deps: [DistrictRepository],
  },
  {
    useCase: DistrictDelete,
    deps: [DistrictRepository],
  },
  {
    useCase: DistrictGetAll,
    deps: [DistrictRepository],
  },
  {
    useCase: DistrictGetOneById,
    deps: [DistrictRepository],
  },
  {
    useCase: GlobalStatusCreate,
    deps: [GlobalStatsusRepository],
  },
  {
    useCase: GlobalStatusUpdate,
    deps: [GlobalStatsusRepository],
  },
  {
    useCase: GlobalStatusDelete,
    deps: [GlobalStatsusRepository],
  },
  {
    useCase: GlobalStatusGetAll,
    deps: [GlobalStatsusRepository],
  },
  {
    useCase: GlobalStatusGetOneById,
    deps: [GlobalStatsusRepository],
  },
  {
    useCase: MaritalStatusCreate,
    deps: [MaritalStatusRepository],
  },
  {
    useCase: MaritalStatusUpdate,
    deps: [MaritalStatusRepository],
  },
  {
    useCase: MaritalStatusDelete,
    deps: [MaritalStatusRepository],
  },
  {
    useCase: MaritalStatusGetAll,
    deps: [MaritalStatusRepository],
  },
  {
    useCase: MaritalStatusGetOneById,
    deps: [MaritalStatusRepository],
  },
];

export const useCasesProviders = useCases.map((uc) => {
  return registerUseCase(uc.useCase, uc.deps);
});
