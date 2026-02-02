import { Country } from '../../domain/entities/country';

export class CountryDto {
  constructor(
    public readonly name: string,
    public readonly abbreviation: string,
    public readonly code: string,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(country: Country): CountryDto {
    return new CountryDto(
      country.getName().value(),
      country.getAbbreviation().value(),
      country.getCode().value(),
      country.getActive().value(),
      country.getId() ? country.getId()?.value() : undefined,
    );
  }
}
