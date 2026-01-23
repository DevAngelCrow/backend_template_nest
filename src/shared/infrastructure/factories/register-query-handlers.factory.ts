import { Abstract, Type } from '@nestjs/common';

export function registerQueryHandler<T>(
  queryHandlerClass: Type<T>,
  dependencies: Array<Type<unknown> | Abstract<unknown>>,
) {
  return {
    provide: queryHandlerClass,
    useFactory: (...deps: unknown[]): T => {
      return Reflect.construct(queryHandlerClass, deps);
    },
    inject: dependencies,
  };
}
