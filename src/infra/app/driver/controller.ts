import { Controller, Get, Header, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Type } from '@sinclair/typebox';
import { Validate } from 'nestjs-typebox';
import { DURATION, setHttpCacheHeader, throwHttpException } from '../http.helper';
import { Roles } from '../roles.helper';
import { AddDriverBodySchema, AddDriverBodyDto } from './input.dto';
import { DriverUsecases } from './module';
import { DriverResponseSchema } from './output.dto';

@Controller('driver')
export class DriverController {
  constructor(
    @Inject('DriverUsecases')
    private readonly usecases: DriverUsecases,
  ) {}

  @Get()
  @HttpCode(200)
  @Header(...setHttpCacheHeader(DURATION.ONE_HOUR))
  @Validate({
    response: Type.Array(DriverResponseSchema),
  })
  async getAllDrivers() {
    const result = await this.usecases.getAllDrivers.execute();
    return result.getOrElse(throwHttpException);
  }

  @Get(':id')
  @HttpCode(200)
  @Header(...setHttpCacheHeader(DURATION.ONE_HOUR))
  @Validate({
    request: [{ type: 'param', name: 'id', schema: Type.String() }],
    response: DriverResponseSchema,
  })
  async getDriver(code: string) {
    const result = await this.usecases.getDriver.execute({ code });
    return result.getOrElse(throwHttpException);
  }

  @Post()
  @Roles(['admin'])
  @HttpCode(201)
  @Validate({
    request: [{ type: 'body', schema: AddDriverBodySchema }],
  })
  @ApiBearerAuth()
  async addDriver(driver: AddDriverBodyDto) {
    const result = await this.usecases.addDriver.execute({ driver });
    return result.getOrElse(throwHttpException);
  }
}
