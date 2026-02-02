import { Country } from 'src/modules/catalogs/domain/entities/country';

export class CountryHttpDto {
  constructor(
    public readonly name: string,
    public readonly abbreviation: string,
    public readonly code: string,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(country: Country): CountryHttpDto {
    return new CountryHttpDto(
      country.getName().value(),
      country.getAbbreviation().value(),
      country.getCode().value(),
      country.getActive().value(),
      country.getId() ? country.getId()?.value() : undefined,
    );
  }
}
