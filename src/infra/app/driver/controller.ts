import { Body, Controller, Get, Header, HttpCode, Inject, Param, Post, UsePipes } from '@nestjs/common';
import { DURATION, setHttpCacheHeader, throwHttpException } from '../http.helper';
import { ZodValidationPipe } from '../pipe.helper';
import { Roles } from '../roles.helper';
import { AddDriverDto, createAddDriverSchema } from './input.dto';
import { DriverUsecases } from './module';

@Controller('driver')
export class DriverController {
  constructor(
    @Inject('DriverUsecases')
    private readonly usecases: DriverUsecases,
  ) {}

  @Get()
  @HttpCode(200)
  @Header(...setHttpCacheHeader(DURATION.ONE_HOUR))
  async getAllDrivers() {
    const result = await this.usecases.getAllDrivers.execute();
    return result.getOrElse(throwHttpException);
  }

  @Get(':id')
  @HttpCode(200)
  @Header(...setHttpCacheHeader(DURATION.ONE_HOUR))
  async getDriver(@Param('id') code: string) {
    const result = await this.usecases.getDriver.execute({ code });
    return result.getOrElse(throwHttpException);
  }

  @Post()
  @Roles(['admin'])
  @UsePipes(new ZodValidationPipe(createAddDriverSchema))
  @HttpCode(201)
  async addDriver(@Body() driver: AddDriverDto) {
    const result = await this.usecases.addDriver.execute({ driver });
    return result.getOrElse(throwHttpException);
  }
}
