import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { CreateRolCommand } from './create-rol.command';
import { Rol } from '@/modules/security/domain/entities/rol';

export class CreateRolHandler {
  constructor(private readonly repository: RolRepository) {}

  async execute(command: CreateRolCommand): Promise<void> {
    const rol = Rol.create({ ...command.rol_dto });
    await this.repository.create(rol);
  }
}
