import { HasVerifiedEmailPort } from '@/modules/auth/domain/ports/has-verified-email.port';
import { User } from '@/modules/identity-access-management/domain/entities/user';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ImplHasVerifiedEmailPort implements HasVerifiedEmailPort {
  async hasVerifiedEmail(user: User): Promise<boolean> {
    if (user?.getIsValidated().value()) {
      return true;
    }
    return false;
  }
}
