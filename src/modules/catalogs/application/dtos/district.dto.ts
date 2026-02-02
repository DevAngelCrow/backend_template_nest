import { District } from '../../domain/entities/district';

export class DistrictDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id_municipality: number,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(district: District): DistrictDto {
    return new DistrictDto(
      district.getName().value(),
      district.getDescription().value(),
      district.getIdMunicipality().value(),
      district.getActive().value(),
      district.getId() ? district.getId()!.value() : undefined,
    );
  }
}
