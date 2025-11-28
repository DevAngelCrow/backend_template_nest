import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class CountryName {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
    const validator = new Validator<string>(this._value, DomainException);
    validator
      .required('Country name is required')
      .string('Country name must be a string')
      .maxLength(100, 'Country name must be at most 100 characters long');
  }
  public value(): string {
    return this._value;
  }
}
