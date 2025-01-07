import { DriverRepository } from '../repository';

export class GetDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  execute(code: string) {
    return this.driverRepository.find(code);
  }
}
