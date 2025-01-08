import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { throwHttpException } from '../http.helper';
import { AddDriverDto } from './input.dto';
import { DriverUsecases } from './module';

@Controller('driver')
export class DriverController {
  constructor(
    @Inject('DriverUsecases')
    private readonly usecases: DriverUsecases,
  ) {}

  @Get()
  @HttpCode(200)
  getAllDrivers() {
    return this.usecases.getAllDrivers.execute().getOrElse(throwHttpException);
  }

  @Get(':id')
  @HttpCode(200)
  async getDriver(@Param('id') code: string) {
    return (await this.usecases.getDriver.execute(code)).getOrElse(
      throwHttpException,
    );
  }

  @Post()
  @HttpCode(201)
  addDriver(@Body() driver: AddDriverDto) {
    return this.usecases.addDriver
      .execute(driver)
      .getOrElse(throwHttpException);
  }
}
