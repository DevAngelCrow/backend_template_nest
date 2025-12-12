import { RolDescription } from '../value-objects/rol-value-object/rol-description';
import { RolId } from '../value-objects/rol-value-object/rol-id';
import { RolIdStatus } from '../value-objects/rol-value-object/rol-id-status';
import { RolName } from '../value-objects/rol-value-object/rol-name';

export class Rol {
  constructor(
    private readonly name: RolName,
    private readonly description: RolDescription,
    private readonly id_status: RolIdStatus,
    private readonly id?: RolId,
  ) {}
  public static create(data: {
    id?: number;
    name: string;
    description: string;
    id_status: number;
  }): Rol {
    return new Rol(
      new RolName(data.name),
      new RolDescription(data.description),
      new RolIdStatus(data.id_status),
      data.id ? new RolId(data.id) : undefined,
    );
  }
  getName(): RolName {
    return this.name;
  }
  getDescription(): RolDescription {
    return this.description;
  }
  getIdStatus(): RolIdStatus {
    return this.id_status;
  }
  getId(): RolId | undefined {
    return this.id;
  }
}
