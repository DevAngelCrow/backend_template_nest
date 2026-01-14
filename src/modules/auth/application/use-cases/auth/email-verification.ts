import { HasVerifiedEmailPort } from '@/modules/auth/domain/ports/has-verified-email.port';
import { User } from '@/modules/identity-access-management/domain/entities/user';

export class EmailVerification {
  constructor(protected readonly hasVerifiedEmailPort: HasVerifiedEmailPort) {}
  public async run(user: User): Promise<boolean> {
    const emailVerified =
      await this.hasVerifiedEmailPort.hasVerifiedEmail(user);
    return emailVerified;
  }
}
