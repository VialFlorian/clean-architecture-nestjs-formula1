import { Usecase, UsecaseResult } from 'src/core/usecase.decorator';
import { Result } from 'typescript-result';
import { Driver } from '../entity';
import { DriverRepository } from '../repository';

export class GetAllDriversUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  @Usecase()
  async execute(): UsecaseResult<Driver[]> {
    const drivers = await this.driverRepository.findAll();
    return Result.ok(drivers);
  }
}
