import { CredentialsValidationPort } from '@/modules/auth/domain/ports/credentials-validation.port';
import { UserName } from '@/modules/auth/domain/value-objects/user-value-object/user-name';
import { UserPassword } from '@/modules/auth/domain/value-objects/user-value-object/user-password';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { PasswordHasher } from '../../services/password-hasher.service';

export class ImplCredentialsValidatorPort implements CredentialsValidationPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async validateCredentials(
    user_name: UserName,
    password: UserPassword,
    db_password: UserPassword,
  ): Promise<boolean> {
    const passwordHasher = new PasswordHasher();
    const isPasswordValid = await passwordHasher.compare(
      password.value(),
      db_password.value(),
    );
    if (!isPasswordValid) {
      return false;
    }
    return isPasswordValid;
  }
}
