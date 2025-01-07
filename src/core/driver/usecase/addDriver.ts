import { Driver } from '../entity';
import { DriverRepository } from '../repository';

export class AddDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  execute(driver: Driver) {
    return this.driverRepository.persist(driver);
  }
}
