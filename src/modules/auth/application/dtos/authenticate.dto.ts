export class AuthenticateDto {
  constructor(
    public readonly user_name: string,
    public readonly id: number,
    public readonly token: string,
  ) {}
}
