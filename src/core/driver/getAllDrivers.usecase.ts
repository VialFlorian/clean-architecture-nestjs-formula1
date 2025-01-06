import { DriverRepository } from './driver.repository';

export class GetAllDriversUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  execute() {
    return this.driverRepository.findAll();
  }
}
