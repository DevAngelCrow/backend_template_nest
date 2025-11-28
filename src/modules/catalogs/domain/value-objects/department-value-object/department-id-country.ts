import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class DepartmentIdCountry {
  private readonly _value: number;

  constructor(value: number) {
    this._value = value;
    const validator = new Validator<number>(this._value, DomainException);
    validator
      .required('Department id country is required')
      .positiveInteger('Department id country must be a positive integer');
  }
  public value(): number {
    return this._value;
  }
}
