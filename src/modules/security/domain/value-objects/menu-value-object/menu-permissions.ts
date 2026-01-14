import { InvalidValueObjectException } from '@/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class MenuPermissions<T> {
  private readonly _value: T;

  constructor(value: T) {
    const createException = (msg: string): InvalidValueObjectException =>
      new InvalidValueObjectException('menu permissions', msg);

    this._value = Validator.of(value, createException)
      .required('Menu permissions are required')
      .getValue();
  }
  public value(): T {
    return this._value;
  }
  // public equals(other: T): boolean {
  //   return this._value === other._value;
  // }

  // public toString(): string {
  //   return this._value.toString();
  // }
}
