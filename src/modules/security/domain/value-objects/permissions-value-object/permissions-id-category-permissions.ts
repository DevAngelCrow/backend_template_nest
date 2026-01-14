import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class PermissionsIdCategoryPermissions {
  private readonly _value: number;

  constructor(value: number) {
    this._value = Validator.of(
      value,
      (msg) =>
        new InvalidValueObjectException(
          'PermissionsIdCategoryPermissions',
          msg,
        ),
    )
      .required('Permissions id category permissions is required')
      .positiveInteger(
        'Permissions id category permissions must be a positive integer',
      )
      .getValue();
  }

  public value(): number {
    return this._value;
  }

  public equals(other: PermissionsIdCategoryPermissions): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
