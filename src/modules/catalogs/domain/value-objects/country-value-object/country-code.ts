import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class CountryCode {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
    const validator = new Validator<string>(this._value, DomainException);
    validator
      .required('Country code is required')
      .string('Country code must be a string')
      .maxLength(4, 'Country code must be at most 4 characters long');
  }
  public value(): string {
    return this._value;
  }
}
