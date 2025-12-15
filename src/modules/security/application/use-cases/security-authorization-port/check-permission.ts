import { SecurityAuthorizationPort } from '@/modules/security/domain/ports/security-authorization.port';

export class CheckPermission {
  constructor(
    private readonly securityAuthorizationPort: SecurityAuthorizationPort,
  ) {}
  async run(permission: string, id_user: number): Promise<boolean> {
    return this.securityAuthorizationPort.checkPermission(permission, id_user);
  }
}
