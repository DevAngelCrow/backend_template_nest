import { Injectable } from '@nestjs/common';
import { VerificationTokenRepository } from '../../domain/repositories/verification-token-repository';
import { UserId } from '../../../identity-access-management/domain/value-objects/user-value-object/user-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';

@Injectable()
export class ImplVerificationTokenRepository implements VerificationTokenRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    user_id: UserId,
    token: string,
    expires_at: Date,
  ): Promise<void> {
    try {
      await this.prisma.mnt_email_verification_tokens.create({
        data: {
          id_user: user_id.value(),
          token: token,
          expires_at: expires_at,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating verification token: ${error.message}`);
      }
      throw new DatabaseException(
        'Unknown database error occurred while creating verification token.',
      );
    }
  }
  async findByToken(
    token: string,
  ): Promise<{ user_id: UserId; expires_at: Date } | null> {
    try {
      const record = await this.prisma.mnt_email_verification_tokens.findUnique(
        {
          where: { token },
        },
      );
      if (!record) {
        return null;
      }
      return {
        user_id: new UserId(Number(record.id_user)),
        expires_at: record.expires_at,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error finding verification token: ${error.message}`);
      }
      throw new DatabaseException(
        'Unknown database error occurred while finding verification token.',
      );
    }
  }
  async deleteByUserId(user_id: UserId): Promise<void> {
    try {
      await this.prisma.mnt_email_verification_tokens.deleteMany({
        where: { id_user: user_id.value() },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting verification token: ${error.message}`);
      }
      throw new DatabaseException(
        'Unknown database error occurred while deleting verification token.',
      );
    }
  }
}
