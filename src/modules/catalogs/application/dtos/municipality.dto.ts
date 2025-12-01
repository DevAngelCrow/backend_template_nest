import { Municipality } from '../../domain/entities/municipality';

export class MunicipalityDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_department: number,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(municipality: Municipality): MunicipalityDto {
    return new MunicipalityDto(
      municipality.getName().value(),
      municipality.getDescription().value(),
      municipality.getIdDepartment().value(),
      municipality.getActive().value(),
      municipality.getId() ? municipality.getId()!.value() : undefined,
    );
  }
}
