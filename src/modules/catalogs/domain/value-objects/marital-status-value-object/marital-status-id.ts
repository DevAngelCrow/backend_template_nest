import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class MaritalStatusId {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('MaritalStatusId', msg),
    )
      .required('Marital status id is required')
      .positiveInteger('Marital status id must be a positive integer')
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: MaritalStatusId): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
