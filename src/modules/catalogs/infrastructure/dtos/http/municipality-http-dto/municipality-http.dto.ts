import { Municipality } from 'src/modules/catalogs/domain/entities/municipality';

export class MunicipalityHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_department: number,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(municipality: Municipality): MunicipalityHttpDto {
    return new MunicipalityHttpDto(
      municipality.getName().value(),
      municipality.getDescription().value(),
      municipality.getIdDepartment().value(),
      municipality.getActive().value(),
      municipality.getId() ? municipality.getId()?.value() : undefined,
    );
  }
}
