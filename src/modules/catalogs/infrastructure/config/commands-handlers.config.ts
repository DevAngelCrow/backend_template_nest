import { Abstract, Type } from '@nestjs/common';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { CreateCountryHandler } from '../../application/country/commands/create-country/create-country.handler';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { CreateCountryCommandAdapter } from '../adapter/country/commands/create-country-command.adapter';
import { DeleteCountryCommandAdapter } from '../adapter/country/commands/delete-country-command.adapter';
import { UpdateCountryCommandAdapter } from '../adapter/country/commands/update-country-command.adapter';
import { UpdateCountryHandler } from '../../application/country/commands/update-country/update-country.handler';
import { DeleteCountryHandler } from '../../application/country/commands/delete-country/delete-country.handler';

// Application Handlers Registration
export const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    handler: CreateCountryHandler,
    deps: [CountryRepository],
  },
  {
    handler: UpdateCountryHandler,
    deps: [CountryRepository],
  },
  {
    handler: DeleteCountryHandler,
    deps: [CountryRepository],
  },
];

// CQRS NestJS Adapters (Infrastructure) Registration
export const commandAdapters = [
  CreateCountryCommandAdapter,
  UpdateCountryCommandAdapter,
  DeleteCountryCommandAdapter,
];

export const commandHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
