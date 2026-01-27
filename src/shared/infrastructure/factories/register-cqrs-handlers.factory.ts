import { Abstract, Type } from '@nestjs/common';

export function registerCqrsHandler<T>(
  commandHandlerClass: Type<T>,
  dependencies: Array<Type<unknown> | Abstract<unknown>>,
) {
  return {
    provide: commandHandlerClass,
    useFactory: (...deps: unknown[]): T => {
      return Reflect.construct(commandHandlerClass, deps);
    },
    inject: dependencies,
  };
}
