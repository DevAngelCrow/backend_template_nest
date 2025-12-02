import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/infrastructure/persistence/prisma/prisma.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    CatalogsModule,
    ProfileModule,
  ],
})
export class AppModule {}
