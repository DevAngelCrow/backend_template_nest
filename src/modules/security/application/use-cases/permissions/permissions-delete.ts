import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { PermissionsId } from '@/modules/security/domain/value-objects/permissions-value-object/permissions-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class PermissionsDelete {
  constructor(protected readonly repository: PermissionsRepository) {}
  public async run(id: number): Promise<void> {
    const permissions = await this.repository.getOneById(new PermissionsId(id));
    if (!permissions) {
      throw new NotFoundException('Permissions', id.toString());
    }
    const permissionsId = permissions.getId();
    if (!permissionsId) {
      throw new Error(`Permissions id is undefined`);
    }
    await this.repository.delete(permissionsId);
  }
}
