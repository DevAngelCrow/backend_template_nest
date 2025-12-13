import { UserId } from '../../../identity-access-management/domain/value-objects/user-value-object/user-id';

export abstract class VerificationTokenRepository {
  abstract create(
    user_id: UserId,
    token: string,
    expires_at: Date,
  ): Promise<void>;
  abstract findByToken(
    token: string,
  ): Promise<{ user_id: UserId; expires_at: Date } | null>;
  abstract deleteByUserId(user_id: UserId): Promise<void>;
}
