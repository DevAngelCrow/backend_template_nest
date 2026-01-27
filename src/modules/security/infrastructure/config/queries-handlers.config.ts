import { Abstract, Type } from '@nestjs/common';
import { GetRolesHandler } from '../../application/rol/queries/get-roles/get-roles.handler';
import { GetRolByIdHandler } from '../../application/rol/queries/get-rol-by-id/get-rol-by-id.handler';
import { GetPermissionsHandler } from '../../application/permissions/queries/get-permissions/get-permissions.handler';
import { GetPermissionsByIdHandler } from '../../application/permissions/queries/get-permissions-by-id/get-permissions-by-id.handler';
import { GetRoutesHandler } from '../../application/route/queries/get-routes/get-routes.handler';
import { GetRouteByIdHandler } from '../../application/route/queries/get-route-by-id/get-route-by-id.handler';
import { GetCategoryPermissionsHandler } from '../../application/category-permissions/queries/get-category-permissions/get-category-permissions.handler';
import { GetCategoryPermissionsByIdHandler } from '../../application/category-permissions/queries/get-category-permissions-by-id/get-category-permissions-by-id.handler';
import { GetRolesQueryAdapter } from '../adapter/rol/queries/get-roles-query.adapter';
import { GetRolByIdQueryAdapter } from '../adapter/rol/queries/get-rol-by-id-query.adapter';
import { GetPermissionsQueryAdapter } from '../adapter/permissions/queries/get-permissions-query.adapter';
import { GetPermissionsByIdQueryAdapter } from '../adapter/permissions/queries/get-permissions-by-id-query.adapter';
import { GetRoutesQueryAdapter } from '../adapter/route/queries/get-routes-query.adapter';
import { GetRouteByIdQueryAdapter } from '../adapter/route/queries/get-route-by-id-query.adapter';
import { GetCategoryPermissionsQueryAdapter } from '../adapter/category-permissions/queries/get-category-permissions-query.adapter';
import { GetCategoryPermissionsByIdQueryAdapter } from '../adapter/category-permissions/queries/get-category-permissions-by-id-query.adapter';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { RolReadRepository } from '../../application/repositories/rol-read.repository';
import { PermissionsReadRepository } from '../../application/repositories/permissions-read.repository';
import { RouteReadRepository } from '../../application/repositories/route-read.repository';
import { CategoryPermissionsReadRepository } from '../../application/repositories/category-permissions-read.repository';

const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // Rol
  {
    handler: GetRolesHandler,
    deps: [RolReadRepository],
  },
  {
    handler: GetRolByIdHandler,
    deps: [RolReadRepository],
  },
  // Permissions
  {
    handler: GetPermissionsHandler,
    deps: [PermissionsReadRepository],
  },
  {
    handler: GetPermissionsByIdHandler,
    deps: [PermissionsReadRepository],
  },
  // Route
  {
    handler: GetRoutesHandler,
    deps: [RouteReadRepository],
  },
  {
    handler: GetRouteByIdHandler,
    deps: [RouteReadRepository],
  },
  // CategoryPermissions
  {
    handler: GetCategoryPermissionsHandler,
    deps: [CategoryPermissionsReadRepository],
  },
  {
    handler: GetCategoryPermissionsByIdHandler,
    deps: [CategoryPermissionsReadRepository],
  },
];

export const queryAdapters = [
  GetRolesQueryAdapter,
  GetRolByIdQueryAdapter,
  GetPermissionsQueryAdapter,
  GetPermissionsByIdQueryAdapter,
  GetRoutesQueryAdapter,
  GetRouteByIdQueryAdapter,
  GetCategoryPermissionsQueryAdapter,
  GetCategoryPermissionsByIdQueryAdapter,
];

export const queryHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
