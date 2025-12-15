import { DecodeTokenPort } from '@/modules/auth/domain/ports/decode-token.port';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ImplDecodeTokenPort implements DecodeTokenPort {
  constructor(private readonly jwtService: JwtService) {}
  async decodeToken(token: string): Promise<object> {
    try {
      const decoded = await this.jwtService.decode(token);
      if (!decoded) {
        throw new Error('Invalid token');
      }
      return JSON.parse(decoded as string) as Record<string, unknown>;
    } catch (error) {
      throw new Error(`Failed to decode token: ${String(error)}`);
    }
  }
}
