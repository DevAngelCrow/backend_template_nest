import { InvalidValueObjectException } from 'src/shared/domain/exceptions/invalid-value-object.exception';
import { Validator } from 'src/shared/domain/validator/validator-value-object';

export class MunicipalityDescription {
  private readonly _value: string;

  constructor(value: string) {
    this._value = Validator.of(
      value,
      (msg) => new InvalidValueObjectException('MunicipalityDescription', msg),
    )
      .required('Municipality description is required')
      .string('Municipality description must be a string')
      .maxLength(
        100,
        'Municipality description must be at most 100 characters long',
      )
      .getValue();
  }

  public value(): string {
    return this._value;
  }

  public equals(other: MunicipalityDescription): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
