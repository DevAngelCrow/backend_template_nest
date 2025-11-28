import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class MunicipalityActive {
  private readonly _value: boolean;

  constructor(value: boolean) {
    this._value = value;
    const validator = new Validator<boolean>(this._value, DomainException);
    validator.boolean('Department active must be a boolean');
  }
  public value(): boolean {
    return this._value;
  }
}
