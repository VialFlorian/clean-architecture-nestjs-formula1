import { Usecase, UsecaseResult } from 'src/core/usecase.decorator';
import { ExistsError } from 'src/core/usecase.errors';
import { Result } from 'typescript-result';
import { Driver } from '../entity';
import { DriverRepository } from '../repository';

type Params = { driver: Driver };

export class AddDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  @Usecase()
  async execute({ driver }: Params): UsecaseResult<void, ExistsError> {
    if (await this.driverRepository.findByName(driver.firstName, driver.lastName)) {
      return Result.error(new ExistsError());
    }
    await this.driverRepository.persist(driver);
    return Result.ok();
  }
}
