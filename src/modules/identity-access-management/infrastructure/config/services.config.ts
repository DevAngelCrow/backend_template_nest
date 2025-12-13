import { Abstract, Type } from '@nestjs/common';
import { UserGetOneByUserName } from '../../application/use-cases/user/user-get-one-by-user-name';
import { FinduserService } from '../../application/services/find-user.service';
import { registerService } from '@/shared/infrastructure/factories/register-service.factory';
import { CreateUserService } from '../../application/services/create-user.service';
import { UserCreate } from '../../application/use-cases/user/user-create';

export const services: Array<{
  service: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    service: FinduserService,
    deps: [UserGetOneByUserName],
  },
  {
    service: CreateUserService,
    deps: [UserCreate],
  },
];
export const serviceProviders = services.map((uc) => {
  return registerService(uc.service, uc.deps);
});
