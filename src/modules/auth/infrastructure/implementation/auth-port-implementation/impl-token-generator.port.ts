import { TokenGeneratorPort } from '@/modules/auth/domain/ports/token-generator.port';
import { UserId } from '@/modules/auth/domain/value-objects/user-value-object/user-id';
import { UserName } from '@/modules/auth/domain/value-objects/user-value-object/user-name';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  user_name: string;
  id: number;
}
@Injectable()
export class ImplTokenGeneratorPort implements TokenGeneratorPort {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(user_name: UserName, id: UserId): Promise<string> {
    const payload: JwtPayload = {
      user_name: user_name.value(),
      id: id.value(),
    };
    return await this.jwtService.signAsync(payload);
  }
}
