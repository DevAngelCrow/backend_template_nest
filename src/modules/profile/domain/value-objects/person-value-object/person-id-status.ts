import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class PersonIdStatus {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('PersonIdStatus', msg),
    )
      .required('Person id status is required')
      .positiveInteger('Person id status must be a positive integer')
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: PersonIdStatus): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
