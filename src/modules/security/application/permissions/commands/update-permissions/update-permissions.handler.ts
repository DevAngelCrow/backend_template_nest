import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { UpdatePermissionsCommand } from './update-permissions.command';
import { Permissions } from '@/modules/security/domain/entities/permissions';

export class UpdatePermissionsHandler {
  constructor(private readonly repository: PermissionsRepository) {}

  async execute(command: UpdatePermissionsCommand): Promise<void> {
    const permissions = Permissions.create({ ...command.permissions_dto });
    await this.repository.update(permissions);
  }
}
