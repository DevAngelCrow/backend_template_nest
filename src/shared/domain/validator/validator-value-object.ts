import { DomainException } from '../exceptions/domain.exception';

export class Validator<T> {
  private value: T;
  private exceptionClass: new (message: string) => DomainException;

  constructor(
    value: T,
    exceptionClass: new (message: string) => DomainException,
  ) {
    this.value = value;
    const instance = new exceptionClass('test');
    if (!(instance instanceof DomainException)) {
      throw new DomainException('Invalid exception type validator');
    }
    this.exceptionClass = exceptionClass;
  }
  required(message: string = 'Field is required'): this {
    if (
      this.value === null ||
      this.value === undefined ||
      this.value === '' ||
      (Array.isArray(this.value) && this.value.length === 0)
    ) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  email(message: string = 'Invalid email format'): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(this.value))) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  number(message: string = 'Invalid number format'): this {
    if (typeof this.value !== 'number' || isNaN(this.value)) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  positiveInteger(message: string = 'Invalid positive integer format'): this {
    if (
      typeof this.value !== 'number' ||
      !Number.isInteger(this.value) ||
      this.value <= 0
    ) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  string(message: string = 'Invalid string format'): this {
    if (typeof this.value !== 'string') {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  uuid(message: string = 'Invalid UUID format'): this {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(String(this.value))) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  ip(message: string = 'Invalid IP address format'): this {
    const ipv4Regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    const strValue = String(this.value);
    if (!ipv4Regex.test(strValue) && !ipv6Regex.test(strValue)) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  minLength(length: number, message: string = 'Invalid string length'): this {
    const strValue = String(this.value);
    if (strValue.length < length) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  maxLength(length: number, message: string = 'Invalid string length'): this {
    const strValue = String(this.value);
    if (strValue.length > length) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  min(min: number, message: string = 'Value is below minimum'): this {
    if (typeof this.value !== 'number' || this.value < min) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  max(max: number, message: string = 'Value exceeds maximum'): this {
    if (typeof this.value !== 'number' || this.value > max) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  pattern(regex: RegExp, message: string = 'Invalid format'): this {
    if (!regex.test(String(this.value))) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  boolean(message: string = 'Invalid boolean format'): this {
    if (typeof this.value !== 'boolean') {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  array(message: string = 'Invalid array format'): this {
    if (!Array.isArray(this.value)) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  date(message: string = 'Invalid date format'): this {
    const date = new Date(this.value as unknown as string | number | Date);
    if (isNaN(date.getTime())) {
      throw new this.exceptionClass(message);
    }

    return this;
  }

  url(message: string = 'Invalid URL format'): this {
    try {
      new URL(String(this.value));
    } catch {
      throw new this.exceptionClass(message);
    }

    return this;
  }
}
