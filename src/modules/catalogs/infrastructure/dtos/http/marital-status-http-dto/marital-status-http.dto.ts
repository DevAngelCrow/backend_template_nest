import { MaritalStatus } from 'src/modules/catalogs/domain/entities/marital-status';

export class MaritalStatusHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly id?: number,
  ) {}
  public static fromEntity(maritalStatus: MaritalStatus): MaritalStatusHttpDto {
    return new MaritalStatusHttpDto(
      maritalStatus.getName().value(),
      maritalStatus.getDescription()?.value() || '',
      maritalStatus.getId() ? maritalStatus.getId()?.value() : undefined,
    );
  }
}
