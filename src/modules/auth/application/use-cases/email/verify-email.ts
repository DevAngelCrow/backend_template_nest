import { UserRepository } from '@/modules/auth/domain/repositories/user-repository';
import { VerificationTokenRepository } from '@/modules/auth/domain/repositories/verification-token-repository';
import { BadRequestException } from '@/shared/domain/exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyEmail {
  constructor(
    private readonly tokenRepository: VerificationTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async run(token: string): Promise<void> {
    const tokenData = await this.tokenRepository.findByToken(token);
    if (!tokenData) {
      throw new BadRequestException('Invalid token');
    }
    if (new Date() > tokenData.expires_at) {
      throw new BadRequestException('Token has expired');
    }
    await this.userRepository.markEmailAsVerified(tokenData.user_id);
    await this.tokenRepository.deleteByUserId(tokenData.user_id);
  }
}
