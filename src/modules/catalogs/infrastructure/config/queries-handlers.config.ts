import { Abstract, Type } from '@nestjs/common';
import { GetCountriesHandler } from '../../application/country/queries/get-countries/get-countries.handler';
import { CountryQueriesRepository } from '../../application/repositories/country-read.repository';
import { GetCountryHandler } from '../../application/country/queries/get-country/get-country.handler';
import { GetAllCountryQueryAdapter } from '../adapter/country/queries/get-all-query.adapter';
import { GetOneByIdCountryQueryAdapter } from '../adapter/country/queries/get-one-by-id-query.adapter';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';

const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    handler: GetCountriesHandler,
    deps: [CountryQueriesRepository],
  },
  {
    handler: GetCountryHandler,
    deps: [CountryQueriesRepository],
  },
];

export const queryAdapters = [
  GetAllCountryQueryAdapter,
  GetOneByIdCountryQueryAdapter,
];

export const queryHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
