export abstract class ValidationTokenPort {
  abstract validateToken(token: string): Promise<number>;
}
