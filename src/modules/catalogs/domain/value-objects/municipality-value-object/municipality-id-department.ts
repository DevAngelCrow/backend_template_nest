import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class MunicipalityIdDepartment {
  private readonly _value: number;

  constructor(value: number) {
    this._value = value;
    const validator = new Validator<number>(this._value, DomainException);
    validator
      .required('Municipality id department is required')
      .positiveInteger('Municipality id department must be a positive integer');
  }
  public value(): number {
    return this._value;
  }
}
