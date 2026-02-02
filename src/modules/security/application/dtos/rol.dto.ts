import { Rol } from '../../domain/entities/rol';

export class RolDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_status: number,
    public readonly id?: number,
  ) {}
  public static fromEntity(rol: Rol): RolDto {
    return new RolDto(
      rol.getName().value(),
      rol.getDescription().value(),
      rol.getIdStatus().value(),
      rol.getId() ? rol.getId()?.value() : undefined,
    );
  }
}
