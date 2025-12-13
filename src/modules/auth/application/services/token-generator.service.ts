import { TokenGeneratorPort } from '../../domain/ports/token-generator.port';
import { UserId } from '../../../identity-access-management/domain/value-objects/user-value-object/user-id';
import { UserName } from '../../../identity-access-management/domain/value-objects/user-value-object/user-name';

export class TokenGeneratorService {
  constructor(private readonly tokenGeneratorPort: TokenGeneratorPort) {}
  async run(user_name: string, id: number): Promise<string> {
    return await this.tokenGeneratorPort.generateToken(
      new UserName(user_name),
      new UserId(id),
    );
  }
}
