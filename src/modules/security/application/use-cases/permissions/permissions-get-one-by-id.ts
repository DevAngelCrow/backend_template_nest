import { Permissions } from '@/modules/security/domain/entities/permissions';
import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { PermissionsId } from '@/modules/security/domain/value-objects/permissions-value-object/permissions-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class PermissionsGetOneById {
  constructor(protected readonly repository: PermissionsRepository) {}
  async run(id: number): Promise<Permissions | null> {
    const permissions = await this.repository.getOneById(new PermissionsId(id));
    if (!permissions) {
      throw new NotFoundException('Permissions', id.toString());
    }
    return permissions;
  }
}
