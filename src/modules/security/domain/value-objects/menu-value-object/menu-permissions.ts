import { InvalidValueObjectException } from '@/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class MenuPermissions {
  private readonly _value: number;

  constructor(value: number) {
    const createException = (msg: string): InvalidValueObjectException =>
      new InvalidValueObjectException('menu permissions', msg);

    this._value = Validator.of(value, createException)
      .required('Menu permissions are required')
      .number('Menu permissions must be a number')
      .positiveInteger('Menu permissions must be a positive integer')
      .getValue();
  }
  public value(): number {
    return this._value;
  }
  public equals(other: MenuPermissions): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
