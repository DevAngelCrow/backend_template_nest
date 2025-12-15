import { DecodeTokenPort } from '@/modules/auth/domain/ports/decode-token.port';
import { SecurityAuthorizationPort } from '../../domain/ports/security-authorization.port';
import { CategoryPermissionsRepository } from '../../domain/repositories/category-permissions-repository';
import { PermissionsRepository } from '../../domain/repositories/permissions-repository';
import { RolRepository } from '../../domain/repositories/rol-repository';
import { RouteRepository } from '../../domain/repositories/route-repository';
import { UserRoleRepository } from '../../domain/repositories/user-rol-repository';
import { ImplSecurityAuthorizationPort } from '../implementation/impl-authorization.port';
import { ImplCategoryPermissionsRepository } from '../implementation/impl-category-permissions.repository';
import { ImplPermissionsRepository } from '../implementation/impl-permissions.repository';
import { ImplRolRepository } from '../implementation/impl-rol.repository';
import { ImplRouteRepository } from '../implementation/impl-route.repository';
import { ImplUserRoleRepository } from '../implementation/impl-user-role.repository';
import { ImplDecodeTokenPort } from '@/modules/auth/infrastructure/implementation/auth-port-implementation/impl-decode-token.port';

export const repositories = [
  { provide: RouteRepository, useClass: ImplRouteRepository },
  {
    provide: CategoryPermissionsRepository,
    useClass: ImplCategoryPermissionsRepository,
  },
  { provide: PermissionsRepository, useClass: ImplPermissionsRepository },
  { provide: RolRepository, useClass: ImplRolRepository },
  { provide: UserRoleRepository, useClass: ImplUserRoleRepository },
  {
    provide: SecurityAuthorizationPort,
    useClass: ImplSecurityAuthorizationPort,
  },
  {
    provide: DecodeTokenPort,
    useClass: ImplDecodeTokenPort,
  },
];
