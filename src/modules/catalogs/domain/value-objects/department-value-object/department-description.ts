import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class DepartmentDescription {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
    const validator = new Validator<string>(this._value, DomainException);
    validator
      .required('Department description is required')
      .string('Department description must be a string')
      .maxLength(
        100,
        'Department description must be at most 100 characters long',
      );
  }
  public value(): string {
    return this._value;
  }
}
