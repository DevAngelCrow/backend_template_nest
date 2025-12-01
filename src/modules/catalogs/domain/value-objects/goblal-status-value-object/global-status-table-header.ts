import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class GlobalStatusTableHeader {
  private readonly _value: string;

  constructor(value: string) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('GlobalStatusTableHeader', msg),
    )
      .required('Global status table header is required')
      .string('Global status table header must be a string')
      .maxLength(
        100,
        'Global status table header must be at most 100 characters long',
      )
      .getValue();
  }

  public value(): string {
    return this._value;
  }

  public equals(other: GlobalStatusTableHeader): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
