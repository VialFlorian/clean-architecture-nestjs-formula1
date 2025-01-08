import { NotFoundError, UnexpectedError } from 'src/core/usecase.errors';
import { Result } from 'typescript-result';
import { DriverRepository } from '../repository';

export class GetDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(code: string) {
    try {
      const driver = await this.driverRepository.find(code);
      if (driver === null) return Result.error(new NotFoundError());
      return Result.ok(driver);
    } catch (error) {
      return Result.error(
        new UnexpectedError(
          'something went wrong during GetDriverUsecase execution',
          { cause: error },
        ),
      );
    }
  }
}
