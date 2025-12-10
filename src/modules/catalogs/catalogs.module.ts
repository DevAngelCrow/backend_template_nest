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

@Module({
  imports: [
    RouterModule.register([{ path: 'catalogs', module: CatalogsModule }]),
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
    { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
  ],
  exports: [...useCasesProviders],
})
export class CatalogsModule {}
