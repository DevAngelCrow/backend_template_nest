import { Rol } from '@/modules/security/domain/entities/rol';
import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { RolId } from '@/modules/security/domain/value-objects/rol-value-object/rol-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class RolGetOneById {
  constructor(protected readonly repository: RolRepository) {}
  async run(id: number): Promise<Rol | null> {
    const rol = await this.repository.getOneById(new RolId(id));
    if (!rol) {
      throw new NotFoundException('Rol', id.toString());
    }
    return rol;
  }
}
