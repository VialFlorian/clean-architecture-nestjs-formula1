import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllDriversUsecase } from 'src/core/driver/getAllDrivers.usecase';

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
