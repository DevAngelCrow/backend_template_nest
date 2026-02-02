import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { CategoryPermissionsController } from './infrastructure/controllers/category-permissions.controller';
import { RolController } from './infrastructure/controllers/rol.controller';
import { PermissionsController } from './infrastructure/controllers/permissions.controller';
import { RouteController } from './infrastructure/controllers/route.controller';
import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import { JwtPassportAuthGuard } from '../auth/infrastructure/guards/jwt-passport-auth.guard';
import { serviceProviders } from './infrastructure/config/services.config';
import { MenuController } from './infrastructure/controllers/menu.controller';
import { CqrsModule } from '@nestjs/cqrs';
import {
  commandAdapters,
  commandHandlerProviders,
} from './infrastructure/config/commands-handlers.config';
import {
  queryAdapters,
  queryHandlerProviders,
} from './infrastructure/config/queries-handlers.config';

@Module({
  imports: [
    RouterModule.register([{ path: 'security', module: SecurityModule }]),
    CqrsModule,
  ],
  controllers: [
    CategoryPermissionsController,
    PermissionsController,
    RolController,
    RouteController,
    MenuController,
  ],
  providers: [
    ...useCasesProviders,
    ...serviceProviders,
    ...repositories,
    ...commandHandlerProviders,
    ...commandAdapters,
    ...queryHandlerProviders,
    ...queryAdapters,
    { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
  ],
  exports: [
    ...useCasesProviders,
    ...serviceProviders,
    ...commandHandlerProviders,
    ...queryHandlerProviders,
  ],
})
export class SecurityModule {}
