import { Abstract, Type } from '@nestjs/common';
import { CreateUserRoleService } from '../../application/services/user-role/create-user-role.service';
import { UserRoleCreate } from '../../application/use-cases/user-rol/user-role-create';
import { registerService } from '@/shared/infrastructure/factories/register-service.factory';
import { TokenDedecoderService } from '@/modules/auth/application/services/token-decoder.service';
import { DecodeTokenPort } from '@/modules/auth/domain/ports/decode-token.port';

export const services: Array<{
  service: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    service: CreateUserRoleService,
    deps: [UserRoleCreate],
  },
  {
    service: TokenDedecoderService,
    deps: [DecodeTokenPort],
  },
];
export const serviceProviders = services.map((uc) => {
  return registerService(uc.service, uc.deps);
});
