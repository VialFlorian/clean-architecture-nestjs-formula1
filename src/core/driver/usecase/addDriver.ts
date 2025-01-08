import { UnexpectedError } from 'src/core/usecase.errors';
import { Result } from 'typescript-result';
import { Driver } from '../entity';
import { DriverRepository } from '../repository';

export class AddDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  execute(driver: Driver) {
    return Result.try(
      () => this.driverRepository.persist(driver),
      (error) =>
        new UnexpectedError('something went wrong during AddDriverUsecase execution', {
          cause: error,
        }),
    );
  }
}
