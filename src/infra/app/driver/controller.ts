import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AddDriverUsecase } from 'src/core/driver/usecase/addDriver';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';
import { GetDriverUsecase } from 'src/core/driver/usecase/getDriver';
import { AddDriverDto } from './input.dto';

@Controller('driver')
export class DriverController {
  constructor(
    @Inject('GetAllDriversUsecase')
    private readonly getAllDriversUsecase: GetAllDriversUsecase,
    @Inject('GetDriverUsecase')
    private readonly getDriverUsecase: GetDriverUsecase,
    @Inject('AddDriverUsecase')
    private readonly addDriverUsecase: AddDriverUsecase,
  ) {}

  @Get()
  getAllDrivers() {
    return this.getAllDriversUsecase.execute();
  }

  @Get(':id')
  getDriver(@Param('id') code: string) {
    return this.getDriverUsecase.execute(code);
  }

  @Post()
  addDriver(@Body() driver: AddDriverDto) {
    return this.addDriverUsecase.execute(driver);
  }
}
