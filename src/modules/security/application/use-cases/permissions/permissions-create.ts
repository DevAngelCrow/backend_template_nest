import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { PermissionsDto } from '../../dtos/permissions.dto';
import { Permissions } from '@/modules/security/domain/entities/permissions';

export class PermissionsCreate {
  constructor(protected readonly repository: PermissionsRepository) {}
  public async run(permissions_dto: PermissionsDto): Promise<void> {
    const permissions = Permissions.create({
      ...permissions_dto,
    });
    await this.repository.create(permissions);
  }
}
