import { District } from 'src/modules/catalogs/domain/entities/district';

export class DistrictHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_municipality: number,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(district: District): DistrictHttpDto {
    return new DistrictHttpDto(
      district.getName().value(),
      district.getDescription().value(),
      district.getIdMunicipality().value(),
      district.getActive().value(),
      district.getId() ? district.getId()?.value() : undefined,
    );
  }
}
