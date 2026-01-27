import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { UpdateRolCommand } from './update-rol.command';
import { Rol } from '@/modules/security/domain/entities/rol';

export class UpdateRolHandler {
  constructor(private readonly repository: RolRepository) {}

  async execute(command: UpdateRolCommand): Promise<void> {
    const rol = Rol.create({ ...command.rol_dto });
    await this.repository.update(rol);
  }
}
