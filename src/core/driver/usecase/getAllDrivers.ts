import { DriverRepository } from '../repository';

export class GetAllDriversUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  execute() {
    return this.driverRepository.findAll();
  }
}
