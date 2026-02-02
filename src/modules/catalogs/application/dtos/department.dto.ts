import { Department } from '../../domain/entities/department';

export class DepartmentDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_country: number,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(department: Department): DepartmentDto {
    return new DepartmentDto(
      department.getName().value(),
      department.getDescription().value(),
      department.getIdCountry().value(),
      department.getActive().value(),
      department.getId() ? department.getId()!.value() : undefined,
    );
  }
}
