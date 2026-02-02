import { Department } from 'src/modules/catalogs/domain/entities/department';

export class DepartmentHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_country: number,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(department: Department): DepartmentHttpDto {
    return new DepartmentHttpDto(
      department.getName().value(),
      department.getDescription().value(),
      department.getIdCountry().value(),
      department.getActive().value(),
      department.getId() ? department.getId()?.value() : undefined,
    );
  }
}
