import { TokenGeneratorPort } from '@/modules/auth/domain/ports/token-generator.port';
import { UserAuth } from '@/modules/identity-access-management/domain/entities/user-auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  user_name: string;
  id?: number;
  sub?: number;
  permissions: string[];
}
@Injectable()
export class ImplTokenGeneratorPort implements TokenGeneratorPort {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(user: UserAuth): Promise<string> {
    const payload: JwtPayload = {
      user_name: user.getUserName().value(),
      id: user.getId()?.value(),
      sub: user.getId()?.value(),
      permissions: user.getPermissions(),
    };
    return await this.jwtService.signAsync(payload);
  }
}
