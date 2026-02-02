import { Abstract, Type } from '@nestjs/common';
import { UserGetOneByUserName } from '../../application/use-cases/user/user-get-one-by-user-name';
import { FinduserService } from '../../application/services/find-user.service';
import { registerService } from '@/shared/infrastructure/factories/register-service.factory';
import { CreateUserService } from '../../application/services/create-user.service';
import { UserCreate } from '../../application/use-cases/user/user-create';
import { FindUserAuthByNameService } from '../../application/services/find-user-auth-by-user-name.service';
import { UserAuthGetOneByUserName } from '../../application/use-cases/user/user-auth-get-one-by-user-name';

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
  {
    service: FindUserAuthByNameService,
    deps: [UserAuthGetOneByUserName],
  },
];
export const serviceProviders = services.map((uc) => {
  return registerService(uc.service, uc.deps);
});
