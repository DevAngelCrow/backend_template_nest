import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class RolId {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('RolId', msg),
    )
      .required('Rol id is required')
      .positiveInteger('Rol id must be a positive integer')
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: RolId): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
