import { SecurityAuthorizationPort } from '@/modules/security/domain/ports/security-authorization.port';

export class HasRole {
  constructor(
    private readonly securityAuthorizationPort: SecurityAuthorizationPort,
  ) {}
  async run(role: string[], id_user: number): Promise<boolean> {
    return this.securityAuthorizationPort.hasRole(role, id_user);
  }
}
