import { Menu } from '@/modules/security/domain/entities/menu';
import { SecurityAuthorizationPort } from '@/modules/security/domain/ports/security-authorization.port';

export class FilterRoutesUser<T, P> {
  constructor(
    private readonly securityAuthorizationPort: SecurityAuthorizationPort,
  ) {}
  async run(id_user: number): Promise<Menu<T, P>[]> {
    return await this.securityAuthorizationPort.filterRoutesForUser(id_user);
  }
}
