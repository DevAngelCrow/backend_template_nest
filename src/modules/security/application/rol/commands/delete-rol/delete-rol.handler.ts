import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { DeleteRolCommand } from './delete-rol.command';
import { RolId } from '@/modules/security/domain/value-objects/rol-value-object/rol-id';

export class DeleteRolHandler {
  constructor(private readonly repository: RolRepository) {}

  async execute(command: DeleteRolCommand): Promise<void> {
    await this.repository.delete(new RolId(command.id));
  }
}
