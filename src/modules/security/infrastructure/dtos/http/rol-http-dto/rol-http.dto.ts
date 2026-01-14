import { Rol } from '@/modules/security/domain/entities/rol';
export class RolHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_status: number,
    public readonly id?: number,
  ) {}
  public static fromEntity(rol: Rol): RolHttpDto {
    return new RolHttpDto(
      rol.getName().value(),
      rol.getDescription().value(),
      rol.getIdStatus().value(),
      rol.getId() ? rol.getId()?.value() : undefined,
    );
  }
}
