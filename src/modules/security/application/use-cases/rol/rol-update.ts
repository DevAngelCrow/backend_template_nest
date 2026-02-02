import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { RolDto } from '../../dtos/rol.dto';
import { Rol } from '@/modules/security/domain/entities/rol';

export class RolUpdate {
  constructor(protected readonly repository: RolRepository) {}
  async run(rol_dto: RolDto): Promise<void> {
    const rol = Rol.create({
      ...rol_dto,
    });
    const rolId = rol.getId();
    if (!rolId) {
      throw new Error('Rol ID is required for update.');
    }
    const findRol = await this.repository.getOneById(rolId);
    if (!findRol) {
      throw new NotFoundException('Rol', rolId.value().toString());
    }
    await this.repository.update(rol);
  }
}
