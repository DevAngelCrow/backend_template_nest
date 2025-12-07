export abstract class HasVerifiedEmailPort {
  abstract hasVerifiedEmail(userId: number): Promise<boolean>;
}
