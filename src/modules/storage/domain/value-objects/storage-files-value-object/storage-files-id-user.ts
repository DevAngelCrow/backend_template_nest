import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class StorageFilesIdUser {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('storage files id user', msg),
    )
      .required('Storage files id user is required')
      .positiveInteger('Storage files id user must be a positive integer')
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: StorageFilesIdUser): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
