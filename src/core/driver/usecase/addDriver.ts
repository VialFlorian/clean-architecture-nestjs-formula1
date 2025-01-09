import { Usecase, UsecaseResult } from 'src/core/usecase.decorator';
import { Result } from 'typescript-result';
import { Driver } from '../entity';
import { DriverRepository } from '../repository';

type Params = { driver: Driver };

export class AddDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  @Usecase()
  async execute({ driver }: Params): UsecaseResult<void> {
    await this.driverRepository.persist(driver);
    return Result.ok();
  }
}
