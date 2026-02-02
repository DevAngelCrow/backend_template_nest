import { TokenGeneratorPort } from '../../domain/ports/token-generator.port';
import { UserAuthDto } from '../dtos/user-auth.dto';
import { UserAuth } from '@/modules/identity-access-management/domain/entities/user-auth';

export class TokenGeneratorService {
  constructor(private readonly tokenGeneratorPort: TokenGeneratorPort) {}
  async run(user: UserAuthDto): Promise<string> {
    const userEntity = UserAuth.create({ ...user });
    return await this.tokenGeneratorPort.generateToken(userEntity);
  }
}
