import { MunicipalityActive } from '../value-objects/municipality-value-object/municipality-active';
import { MunicipalityDescription } from '../value-objects/municipality-value-object/municipality-description';
import { MunicipalityId } from '../value-objects/municipality-value-object/municipality-id';
import { MunicipalityIdDepartment } from '../value-objects/municipality-value-object/municipality-id-department';
import { MunicipalityName } from '../value-objects/municipality-value-object/municipality-name';

export class Municipality {
  constructor(
    private readonly name: MunicipalityName,
    private readonly description: MunicipalityDescription,
    private readonly id_department: MunicipalityIdDepartment,
    private readonly active: MunicipalityActive,
    private readonly id?: MunicipalityId,
  ) {}
  static create(data: {
    id?: number;
    name: string;
    description: string;
    id_department: number;
    active: boolean;
  }): Municipality {
    return new Municipality(
      new MunicipalityName(data.name),
      new MunicipalityDescription(data.description),
      new MunicipalityIdDepartment(data.id_department),
      new MunicipalityActive(data.active),
      data.id ? new MunicipalityId(data.id) : undefined,
    );
  }

  public getId(): MunicipalityId | undefined {
    return this.id;
  }
  public getName(): MunicipalityName {
    return this.name;
  }
  public getDescription(): MunicipalityDescription {
    return this.description;
  }
  public getIdDepartment(): MunicipalityIdDepartment {
    return this.id_department;
  }
  public getActive(): MunicipalityActive {
    return this.active;
  }
}
