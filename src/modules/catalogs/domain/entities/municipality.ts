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
