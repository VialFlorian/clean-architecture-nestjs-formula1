import { Usecase, UsecaseResult } from 'src/core/usecase.decorator';
import { NotFoundError } from 'src/core/usecase.errors';
import { Result } from 'typescript-result';
import { Driver } from '../entity';
import { DriverRepository } from '../repository';

type Params = { code: string };

export class GetDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  @Usecase()
  async execute({ code }: Params): UsecaseResult<Driver, NotFoundError> {
    const driver = await this.driverRepository.find(code);
    if (driver === null) return Result.error(new NotFoundError());
    return Result.ok(driver);
  }
}
