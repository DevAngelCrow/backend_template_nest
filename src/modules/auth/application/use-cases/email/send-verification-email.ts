import { EmailSenderPort } from '@/modules/auth/domain/ports/email-sender.port';
import { VerificationTokenRepository } from '@/modules/auth/domain/repositories/verification-token-repository';
import { UserId } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-id';
import { UserName } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-name';
import { PersonEmail } from '@/modules/profile/domain/value-objects/person-value-object/person-email';
import { randomBytes } from 'crypto';

export class SendVerificationEmail {
  constructor(
    private readonly emailSender: EmailSenderPort,
    private readonly tokenRepository: VerificationTokenRepository,
  ) {}
  async run(user_id: number, email: string, user_name: string): Promise<void> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    const userId = new UserId(user_id);
    const userName = new UserName(user_name);
    const personEmail = new PersonEmail(email);
    // Replace with actual user ID
    await this.tokenRepository.create(userId, token, expiresAt);

    await this.emailSender.sendVerificationEmail(personEmail, userName, token);
  }
}
