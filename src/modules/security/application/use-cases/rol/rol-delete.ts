import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { RolId } from '@/modules/security/domain/value-objects/rol-value-object/rol-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class RolDelete {
  constructor(protected readonly repository: RolRepository) {}
  public async run(id: number): Promise<void> {
    const rol = await this.repository.getOneById(new RolId(id));
    if (!rol) {
      throw new NotFoundException('Rol', id.toString());
    }
    const rolId = rol.getId();
    if (!rolId) {
      throw new Error(`Rol id is undefined`);
    }
    await this.repository.delete(rolId);
  }
}
