import { Abstract, Type } from '@nestjs/common';
import { RolRepository } from '../../domain/repositories/rol-repository';
import { PermissionsRepository } from '../../domain/repositories/permissions-repository';
import { RouteRepository } from '../../domain/repositories/route-repository';
import { CategoryPermissionsRepository } from '../../domain/repositories/category-permissions-repository';
import { CreateRolHandler } from '../../application/rol/commands/create-rol/create-rol.handler';
import { UpdateRolHandler } from '../../application/rol/commands/update-rol/update-rol.handler';
import { DeleteRolHandler } from '../../application/rol/commands/delete-rol/delete-rol.handler';
import { CreatePermissionsHandler } from '../../application/permissions/commands/create-permissions/create-permissions.handler';
import { UpdatePermissionsHandler } from '../../application/permissions/commands/update-permissions/update-permissions.handler';
import { DeletePermissionsHandler } from '../../application/permissions/commands/delete-permissions/delete-permissions.handler';
import { CreateRouteHandler } from '../../application/route/commands/create-route/create-route.handler';
import { UpdateRouteHandler } from '../../application/route/commands/update-route/update-route.handler';
import { DeleteRouteHandler } from '../../application/route/commands/delete-route/delete-route.handler';
import { CreateCategoryPermissionsHandler } from '../../application/category-permissions/commands/create-category-permissions/create-category-permissions.handler';
import { UpdateCategoryPermissionsHandler } from '../../application/category-permissions/commands/update-category-permissions/update-category-permissions.handler';
import { DeleteCategoryPermissionsHandler } from '../../application/category-permissions/commands/delete-category-permissions/delete-category-permissions.handler';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { CreateRolCommandAdapter } from '../adapter/rol/commands/create-rol-command.adapter';
import { UpdateRolCommandAdapter } from '../adapter/rol/commands/update-rol-command.adapter';
import { DeleteRolCommandAdapter } from '../adapter/rol/commands/delete-rol-command.adapter';
import { CreatePermissionsCommandAdapter } from '../adapter/permissions/commands/create-permissions-command.adapter';
import { UpdatePermissionsCommandAdapter } from '../adapter/permissions/commands/update-permissions-command.adapter';
import { DeletePermissionsCommandAdapter } from '../adapter/permissions/commands/delete-permissions-command.adapter';
import { CreateRouteCommandAdapter } from '../adapter/route/commands/create-route-command.adapter';
import { UpdateRouteCommandAdapter } from '../adapter/route/commands/update-route-command.adapter';
import { DeleteRouteCommandAdapter } from '../adapter/route/commands/delete-route-command.adapter';
import { CreateCategoryPermissionsCommandAdapter } from '../adapter/category-permissions/commands/create-category-permissions-command.adapter';
import { UpdateCategoryPermissionsCommandAdapter } from '../adapter/category-permissions/commands/update-category-permissions-command.adapter';
import { DeleteCategoryPermissionsCommandAdapter } from '../adapter/category-permissions/commands/delete-category-permissions-command.adapter';

// Application Handlers Registration
export const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // Rol
  {
    handler: CreateRolHandler,
    deps: [RolRepository],
  },
  {
    handler: UpdateRolHandler,
    deps: [RolRepository],
  },
  {
    handler: DeleteRolHandler,
    deps: [RolRepository],
  },
  // Permissions
  {
    handler: CreatePermissionsHandler,
    deps: [PermissionsRepository],
  },
  {
    handler: UpdatePermissionsHandler,
    deps: [PermissionsRepository],
  },
  {
    handler: DeletePermissionsHandler,
    deps: [PermissionsRepository],
  },
  // Route
  {
    handler: CreateRouteHandler,
    deps: [RouteRepository],
  },
  {
    handler: UpdateRouteHandler,
    deps: [RouteRepository],
  },
  {
    handler: DeleteRouteHandler,
    deps: [RouteRepository],
  },
  // CategoryPermissions
  {
    handler: CreateCategoryPermissionsHandler,
    deps: [CategoryPermissionsRepository],
  },
  {
    handler: UpdateCategoryPermissionsHandler,
    deps: [CategoryPermissionsRepository],
  },
  {
    handler: DeleteCategoryPermissionsHandler,
    deps: [CategoryPermissionsRepository],
  },
];

// CQRS NestJS Adapters (Infrastructure) Registration
export const commandAdapters = [
  CreateRolCommandAdapter,
  UpdateRolCommandAdapter,
  DeleteRolCommandAdapter,
  CreatePermissionsCommandAdapter,
  UpdatePermissionsCommandAdapter,
  DeletePermissionsCommandAdapter,
  CreateRouteCommandAdapter,
  UpdateRouteCommandAdapter,
  DeleteRouteCommandAdapter,
  CreateCategoryPermissionsCommandAdapter,
  UpdateCategoryPermissionsCommandAdapter,
  DeleteCategoryPermissionsCommandAdapter,
];

export const commandHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
