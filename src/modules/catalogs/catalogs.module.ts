import { Module } from '@nestjs/common';
import { CountryController } from './infrastructure/controllers/country.controller';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { DepartmentController } from './infrastructure/controllers/department.controller';
import { DistrictController } from './infrastructure/controllers/district.controller';
import { MunicipalityController } from './infrastructure/controllers/municipality.controller';
import { GlobalStatusController } from './infrastructure/controllers/global-status.controller';
import { MaritalStatusController } from './infrastructure/controllers/marital-status.controller';
import { JwtPassportAuthGuard } from '../auth/infrastructure/guards/jwt-passport-auth.guard';
import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import {
  commandAdapters,
  commandHandlerProviders,
} from './infrastructure/config/commands-handlers.config';
import { CqrsModule } from '@nestjs/cqrs';
import {
  queryAdapters,
  queryHandlerProviders,
} from './infrastructure/config/queries-handlers.config';

@Module({
  imports: [
    RouterModule.register([{ path: 'catalogs', module: CatalogsModule }]),
    CqrsModule,
  ],
  controllers: [
    CountryController,
    DepartmentController,
    DistrictController,
    MunicipalityController,
    GlobalStatusController,
    MaritalStatusController,
  ],
  providers: [
    ...useCasesProviders,
    ...repositories,
    ...commandHandlerProviders,
    ...commandAdapters,
    ...queryHandlerProviders,
    ...queryAdapters,
    { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
  ],
  exports: [
    ...useCasesProviders,
    ...commandHandlerProviders,
    ...queryHandlerProviders,
  ],
})
export class CatalogsModule {}
