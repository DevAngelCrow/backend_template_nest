import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/infrastructure/persistence/prisma/prisma.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ProfileModule } from './modules/profile/profile.module';
import { TransactionInterceptor } from './shared/infrastructure/interceptors/transaction.interceptor';

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
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransactionInterceptor,
    },
  ],
})
export class AppModule {}
