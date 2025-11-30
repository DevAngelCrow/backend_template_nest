import { CountryAbbreviation } from '../value-objects/country-value-object/contry-abbreviation';
import { CountryActive } from '../value-objects/country-value-object/country-active';
import { CountryCode } from '../value-objects/country-value-object/country-code';
import { CountryId } from '../value-objects/country-value-object/country-id';
import { CountryName } from '../value-objects/country-value-object/country-name';

export class Country {
  constructor(
    private readonly name: CountryName,
    private readonly abbreviation: CountryAbbreviation,
    private readonly code: CountryCode,
    private readonly active: CountryActive,
    private readonly id?: CountryId,
  ) {}
  static create(data: {
    id?: number;
    name: string;
    abbreviation: string;
    code: string;
    active: boolean;
  }): Country {
    return new Country(
      new CountryName(data.name),
      new CountryAbbreviation(data.abbreviation),
      new CountryCode(data.code),
      new CountryActive(data.active),
      data.id ? new CountryId(data.id) : undefined,
    );
  }
  public getId(): CountryId | undefined {
    return this.id;
  }
  public getName(): CountryName {
    return this.name;
  }
  public getAbbreviation(): CountryAbbreviation {
    return this.abbreviation;
  }
  public getCode(): CountryCode {
    return this.code;
  }
  public getActive(): CountryActive {
    return this.active;
  }
}
