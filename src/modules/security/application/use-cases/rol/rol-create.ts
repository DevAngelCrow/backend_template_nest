import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { RolDto } from '../../dtos/rol.dto';
import { Rol } from '@/modules/security/domain/entities/rol';

export class RolCreate {
  constructor(protected readonly repository: RolRepository) {}
  public async run(rol_dto: RolDto): Promise<void> {
    const rol = Rol.create({
      ...rol_dto,
    });
    await this.repository.create(rol);
  }
}
