import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { DeletePermissionsCommand } from './delete-permissions.command';
import { PermissionsId } from '@/modules/security/domain/value-objects/permissions-value-object/permissions-id';

export class DeletePermissionsHandler {
  constructor(private readonly repository: PermissionsRepository) {}

  async execute(command: DeletePermissionsCommand): Promise<void> {
    await this.repository.delete(new PermissionsId(command.id));
  }
}
