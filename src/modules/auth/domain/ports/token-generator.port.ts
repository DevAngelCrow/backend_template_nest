import { UserAuth } from '@/modules/identity-access-management/domain/entities/user-auth';

export abstract class TokenGeneratorPort {
  abstract generateToken(user: UserAuth): Promise<string>;
}
