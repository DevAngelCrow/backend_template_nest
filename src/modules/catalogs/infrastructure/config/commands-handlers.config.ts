import { Abstract, Type } from '@nestjs/common';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { CreateCountryHandler } from '../../application/country/commands/create-country/create-country.handler';
import { registerCommandHandler } from '@/shared/infrastructure/factories/register-command-handlers.factory';
import { CreateCountryCommandAdapter } from '../adapter/country/create-country-command.adapter';

// export const commandHandlers: Array<{
//   command: Type<unknown>;
//   deps: Array<Type<unknown> | Abstract<unknown>>;
// }> = [
//   {
//     command: CreateCountryHandler,
//     deps: [CountryRepository],
//   },
// ];

// export const commandHandlerProviders = commandHandlers.map((uc) => {
//   return registerCommandHandler(uc.command, uc.deps);
// });

// Application Handlers Registration
export const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    handler: CreateCountryHandler,
    deps: [CountryRepository]
  }
];

// CQRS NestJS Adapters (Infrastructure) Registration
export const commandAdapters = [
  CreateCountryCommandAdapter
];

export const commandHandlerProviders = applicationHandlers.map((ah) => {
  return registerCommandHandler(ah.handler, ah.deps);
})
