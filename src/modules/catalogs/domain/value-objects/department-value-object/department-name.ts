import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class DepartmentName {
  private readonly _value: string;

  constructor(value: string) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('DepartmentName', msg),
    )
      .required('Department name is required')
      .string('Department name must be a string')
      .maxLength(100, 'Department name must be at most 100 characters long')
      .getValue();
  }

  public value(): string {
    return this._value;
  }

  public equals(other: DepartmentName): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
