import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AddDriverDto } from './input.dto';
import { DriverUsecases } from './module';

@Controller('driver')
export class DriverController {
  constructor(
    @Inject('DriverUsecases')
    private readonly usecases: DriverUsecases,
  ) {}

  @Get()
  getAllDrivers() {
    return this.usecases.getAllDrivers.execute();
  }

  @Get(':id')
  getDriver(@Param('id') code: string) {
    return this.usecases.getDriver.execute(code);
  }

  @Post()
  addDriver(@Body() driver: AddDriverDto) {
    return this.usecases.addDriver.execute(driver);
  }
}
