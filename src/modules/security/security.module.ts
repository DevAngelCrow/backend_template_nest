import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { CategoryPermissionsController } from './infrastructure/controllers/category-permissions.controller';
import { RolController } from './infrastructure/controllers/rol.controller';
import { PermissionsController } from './infrastructure/controllers/permissions.controller';
import { RouteController } from './infrastructure/controllers/route.controller';
import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import { JwtPassportAuthGuard } from '../auth/infrastructure/guards/jwt-passport-auth.guard';

@Module({
  imports: [
    RouterModule.register([{ path: 'security', module: SecurityModule }]),
  ],
  controllers: [
    CategoryPermissionsController,
    PermissionsController,
    RolController,
    RouteController,
  ],
  providers: [
    ...useCasesProviders,
    ...repositories,
    { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
  ],
  exports: [...useCasesProviders],
})
export class SecurityModule {}
