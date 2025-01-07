import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';

@Controller('driver')
export class DriverController {
  constructor(
    @Inject('GetAllDriversUsecase')
    private readonly getAllDriversUsecase: GetAllDriversUsecase,
  ) {}

  @Get()
  getAllDrivers() {
    return this.getAllDriversUsecase.execute();
  }
}
