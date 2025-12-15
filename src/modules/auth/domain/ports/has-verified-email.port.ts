import { User } from '@/modules/identity-access-management/domain/entities/user';

export abstract class HasVerifiedEmailPort {
  abstract hasVerifiedEmail(user: User): Promise<boolean>;
}
