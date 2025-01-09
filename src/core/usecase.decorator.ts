import { Result } from 'typescript-result';
import { UnexpectedError } from './usecase.errors';

export function Usecase() {
  return function (target: any, _: string, descriptor: PropertyDescriptor) {
    const usecase = target.constructor.name;
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        return Result.error(
          new UnexpectedError(`something went wrong during ${usecase} execution`, {
            cause: error,
          }),
        );
      }
    };

    return descriptor;
  };
}

export type UsecaseResult<Success, Error = never> = Promise<Result<Success, Error | UnexpectedError>>;
