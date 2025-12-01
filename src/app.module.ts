import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/infrastructure/persistence/prisma/prisma.module';
import { CountryController } from './modules/catalogs/infrastructure/controllers/country.controller';
import { PrismaService } from './shared/infrastructure/persistence/prisma/prisma.service';
import { CountryCreate } from './modules/catalogs/application/use-cases/country/country-create';
import { CountryRepository } from './modules/catalogs/domain/repositories/country-repository';
import { ImplCountryRepository } from './modules/catalogs/infrastructure/implementation/impl-country.repository';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
  ],
  controllers: [CountryController],
  providers: [
    PrismaService,
    CountryCreate,
    { provide: CountryRepository, useClass: ImplCountryRepository },
  ],
})
export class AppModule {}
