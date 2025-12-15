import { DecodeTokenPort } from '../../domain/ports/decode-token.port';

export class TokenDedecoderService {
  constructor(private readonly decodedTokenPort: DecodeTokenPort) {}
  async run(token: string): Promise<object> {
    return await this.decodedTokenPort.decodeToken(token);
  }
}
