import { Abstract, Type } from '@nestjs/common';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { CreateCountryHandler } from '../../application/country/commands/create-country/create-country.handler';
import { registerCommandHandler } from '@/shared/infrastructure/factories/register-command-handlers.factory';

export const commandHandlers: Array<{
  command: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    command: CreateCountryHandler,
    deps: [CountryRepository],
  },
];

export const commandHandlerProviders = commandHandlers.map((uc) => {
  return registerCommandHandler(uc.command, uc.deps);
});
