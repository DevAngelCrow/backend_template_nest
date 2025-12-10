import { InvalidValueObjectException } from '@/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class MenuPermissions {
  private readonly _value: string;

  constructor(value: string) {
    const createException = (msg: string): InvalidValueObjectException =>
      new InvalidValueObjectException('menu permissions', msg);

    this._value = Validator.of(value, createException)
      .required('Menu permissions are required')
      .string('Menu permissions must be a string')
      .minLength(2, 'Menu permissions must be at least 2 characters long')
      .maxLength(255, 'Menu permissions must be at most 255 characters long')
      .getValue();
  }
  public value(): string {
    return this._value;
  }
  public equals(other: MenuPermissions): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
