import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class StorageFilesIdProvider {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) =>
        new InvalidValueObjectException('storage files id provider', msg),
    )
      .required('Storage files id provider is required')
      .positiveInteger('Storage files id provider must be a positive integer')
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: StorageFilesIdProvider): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
