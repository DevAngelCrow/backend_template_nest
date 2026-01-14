import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { PermissionsDto } from '../../dtos/permissions.dto';
import { Permissions } from '@/modules/security/domain/entities/permissions';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class PermissionsUpdate {
  constructor(protected readonly repository: PermissionsRepository) {}
  async run(permissions_dto: PermissionsDto): Promise<void> {
    const permissions = Permissions.create({
      ...permissions_dto,
    });
    const permissionsId = permissions.getId();
    if (!permissionsId) {
      throw new Error('Permissions ID is required for update.');
    }
    const findPermissions = await this.repository.getOneById(permissionsId);
    if (!findPermissions) {
      throw new NotFoundException(
        'Permissions',
        permissionsId.value().toString(),
      );
    }
    await this.repository.update(permissions);
  }
}
