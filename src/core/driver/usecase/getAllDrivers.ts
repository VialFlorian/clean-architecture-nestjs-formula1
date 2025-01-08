import { UnexpectedError } from 'src/core/usecase.errors';
import { Result } from 'typescript-result';
import { DriverRepository } from '../repository';

export class GetAllDriversUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  execute() {
    return Result.try(
      () => this.driverRepository.findAll(),
      (error) =>
        new UnexpectedError('something went wrong during GetAllDriversUsecase execution', {
          cause: error,
        }),
    );
  }
}
