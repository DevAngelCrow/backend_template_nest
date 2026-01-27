import { Abstract, Type } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository';
import { CreateUserHandler } from '../../application/user/commands/create-user/create-user.handler';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { CreateUserCommandAdapter } from '../adapter/user/commands/create-user-command.adapter';

// Application Handlers Registration
export const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // User
  {
    handler: CreateUserHandler,
    deps: [UserRepository],
  },
];

// CQRS NestJS Adapters (Infrastructure) Registration
export const commandAdapters = [CreateUserCommandAdapter];

export const commandHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
