import { Abstract, Type } from '@nestjs/common';
import { GetUserByIdHandler } from '../../application/user/queries/get-user-by-id/get-user-by-id.handler';
import { GetUserByUserNameHandler } from '../../application/user/queries/get-user-by-user-name/get-user-by-user-name.handler';
import { UserRepository } from '../../domain/repositories/user-repository';
import { GetUserByIdQueryAdapter } from '../adapter/user/queries/get-user-by-id-query.adapter';
import { GetUserByUserNameQueryAdapter } from '../adapter/user/queries/get-user-by-user-name-query.adapter';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';

const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // User
  {
    handler: GetUserByIdHandler,
    deps: [UserRepository],
  },
  {
    handler: GetUserByUserNameHandler,
    deps: [UserRepository],
  },
];

export const queryAdapters = [
  GetUserByIdQueryAdapter,
  GetUserByUserNameQueryAdapter,
];

export const queryHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
