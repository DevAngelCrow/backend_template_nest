import { InvalidValueObjectException } from '@/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class CountryAbbreviation {
  private readonly _value: string;

  constructor(value: string) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('country abbreviation', msg),
    )
      .required('Country abbreviation is required')
      .string('Country abbreviation must be a string')
      .minLength(2, 'Country abbreviation must be at least 2 characters long')
      .maxLength(4, 'Country abbreviation must be at most 2 characters long')
      .getValue();
  }
  public value(): string {
    return this._value;
  }
}
