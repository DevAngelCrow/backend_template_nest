import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class DocumentIdTypeDocument {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('DocumentIdTypeDocument', msg),
    )
      .required('Document id type document is required')
      .positiveInteger('Document id type document must be a positive integer')
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: DocumentIdTypeDocument): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
