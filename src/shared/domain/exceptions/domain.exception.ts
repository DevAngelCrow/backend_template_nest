export class DomainException extends Error {
  constructor(public readonly message: string = 'Domain exception occurred') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
