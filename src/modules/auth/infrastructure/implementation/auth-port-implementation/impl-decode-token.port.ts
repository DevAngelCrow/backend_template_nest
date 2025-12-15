import { DecodeTokenPort } from '@/modules/auth/domain/ports/decode-token.port';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ImplDecodeTokenPort implements DecodeTokenPort {
  constructor(private readonly jwtService: JwtService) {}
  async decodeToken(token: string): Promise<object> {
    try {
      const rawToken = token.startsWith('Bearer ')
        ? token.split(' ')[1]
        : token;
      const payload = await this.jwtService.verifyAsync(rawToken);

      if (!payload || typeof payload === 'string') {
        throw new Error('Invalid token payload');
      }
      return payload as Record<string, unknown>;
    } catch (error) {
      throw new Error(`Failed to decode token: ${String(error)}`);
    }
  }
}
