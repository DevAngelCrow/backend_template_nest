export abstract class CloseSessionPort {
  abstract closeSession(userId: number): Promise<void>;
}
