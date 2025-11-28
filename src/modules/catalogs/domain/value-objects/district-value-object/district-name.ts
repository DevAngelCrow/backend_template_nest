import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class DistrictName {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
    const validator = new Validator<string>(this._value, DomainException);
    validator
      .required('District name is required')
      .string('District name must be a string')
      .maxLength(100, 'District name must be at most 100 characters long');
  }
  public value(): string {
    return this._value;
  }
}
