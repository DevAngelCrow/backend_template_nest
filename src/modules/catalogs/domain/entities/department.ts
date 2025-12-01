import { DepartmentActive } from '../value-objects/department-value-object/department-active';
import { DepartmentDescription } from '../value-objects/department-value-object/department-description';
import { DepartmentId } from '../value-objects/department-value-object/department-id';
import { DepartmentIdCountry } from '../value-objects/department-value-object/department-id-country';
import { DepartmentName } from '../value-objects/department-value-object/department-name';

export class Department {
  constructor(
    private readonly name: DepartmentName,
    private readonly description: DepartmentDescription,
    private readonly id_country: DepartmentIdCountry,
    private readonly active: DepartmentActive,
    private readonly id?: DepartmentId,
  ) {}
  static create(data: {
    id?: number;
    name: string;
    description: string;
    id_country: number;
    active: boolean;
  }): Department {
    return new Department(
      new DepartmentName(data.name),
      new DepartmentDescription(data.description),
      new DepartmentIdCountry(data.id_country),
      new DepartmentActive(data.active),
      data.id ? new DepartmentId(data.id) : undefined,
    );
  }
  public getId(): DepartmentId | undefined {
    return this.id;
  }
  public getName(): DepartmentName {
    return this.name;
  }
  public getDescription(): DepartmentDescription {
    return this.description;
  }
  public getIdCountry(): DepartmentIdCountry {
    return this.id_country;
  }
  public getActive(): DepartmentActive {
    return this.active;
  }
}
