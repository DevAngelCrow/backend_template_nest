import { APP_GUARD } from '@nestjs/core';
import { UserRepository } from '../../domain/repositories/user-repository';
import { ImplUserRepository } from '../implementation/impl-user.repository';
import { JwtPassportAuthGuard } from '@/modules/auth/infrastructure/guards/jwt-passport-auth.guard';

export const respositories = [
  { provide: UserRepository, useClass: ImplUserRepository },
  {
    provide: APP_GUARD,
    useClass: JwtPassportAuthGuard,
  },
];
