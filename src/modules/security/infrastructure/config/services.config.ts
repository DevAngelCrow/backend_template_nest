import { Abstract, Type } from '@nestjs/common';
import { CreateUserRoleService } from '../../application/services/user-role/create-user-role.service';
import { UserRoleCreate } from '../../application/use-cases/user-rol/user-role-create';
import { registerService } from '@/shared/infrastructure/factories/register-service.factory';

export const services: Array<{
  service: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    service: CreateUserRoleService,
    deps: [UserRoleCreate],
  },
];
export const serviceProviders = services.map((uc) => {
  return registerService(uc.service, uc.deps);
});
