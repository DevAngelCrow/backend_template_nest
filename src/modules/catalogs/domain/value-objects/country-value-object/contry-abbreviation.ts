import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class CountryAbbreviation {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
    const validator = new Validator<string>(this._value, DomainException);
    validator
      .required('Country abbreviation is required')
      .string('Country abbreviation must be a string')
      .minLength(2, 'Country abbreviation must be at least 2 characters long')
      .maxLength(4, 'Country abbreviation must be at most 2 characters long');
  }
  public value(): string {
    return this._value;
  }
}
