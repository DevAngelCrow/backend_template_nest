import { Abstract, Type } from '@nestjs/common';

export function registerUseCase<T>(
  useCaseClass: Type<T>,
  dependencies: Array<Type<unknown> | Abstract<unknown>>,
) {
  return {
    provide: useCaseClass,
    useFactory: (...deps: unknown[]): T => {
      return Reflect.construct(useCaseClass, deps);
    },
    inject: dependencies,
  };
}
