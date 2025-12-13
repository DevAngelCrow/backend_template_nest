import { Abstract, Type } from '@nestjs/common';
import { UserCreate } from '../../application/use-cases/user/user-create';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserGetOneById } from '../../application/use-cases/user/user-get-one-by-id';
import { UserGetOneByUserName } from '../../application/use-cases/user/user-get-one-by-user-name';
import { registerUseCase } from '@/shared/infrastructure/factories/register-use-case.factory';
export const useCases: Array<{
  useCase: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    useCase: UserCreate,
    deps: [UserRepository],
  },
  {
    useCase: UserGetOneById,
    deps: [UserRepository],
  },
  {
    useCase: UserGetOneByUserName,
    deps: [UserRepository],
  },
];

export const useCasesProviders = useCases.map((uc) => {
  return registerUseCase(uc.useCase, uc.deps);
});
