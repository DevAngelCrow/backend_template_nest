import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class DepartmentIdCountry {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('DepartmentIdCountry', msg),
    )
      .required('Department id country is required')
      .positiveInteger('Department id country must be a positive integer')
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: DepartmentIdCountry): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
