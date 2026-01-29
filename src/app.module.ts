import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/infrastructure/persistence/prisma/prisma.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ProfileModule } from './modules/profile/profile.module';
import { StorageModule } from './modules/storage/storage.module';
import { TransactionInterceptor } from './shared/infrastructure/interceptors/transaction.interceptor';
import { SecurityModule } from './modules/security/security.module';
import { AuthModule } from './modules/auth/auth.module';
import { IdentityAccessManagementModule } from './modules/identity-access-management/identity-access-management.module';
import { validate } from './shared/infrastructure/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validate,
    }),
    PrismaModule,
    CatalogsModule,
    ProfileModule,
    StorageModule,
    SecurityModule,
    AuthModule,
    IdentityAccessManagementModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransactionInterceptor,
    },
  ],
})
export class AppModule {}
