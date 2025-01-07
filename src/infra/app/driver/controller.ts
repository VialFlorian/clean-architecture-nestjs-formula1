import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';
import { GetDriverUsecase } from 'src/core/driver/usecase/getDriver';

@Controller('driver')
export class DriverController {
  constructor(
    @Inject('GetAllDriversUsecase')
    private readonly getAllDriversUsecase: GetAllDriversUsecase,
    @Inject('GetDriverUsecase')
    private readonly getDriverUsecase: GetDriverUsecase,
  ) {}

  @Get()
  getAllDrivers() {
    return this.getAllDriversUsecase.execute();
  }

  @Get(':id')
  getDriver(@Param('id') code: string) {
    return this.getDriverUsecase.execute(code);
  }
}
