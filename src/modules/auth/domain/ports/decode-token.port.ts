export abstract class DecodeTokenPort {
  abstract decodeToken(token: string): Promise<object>;
}
