import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { throwHttpException } from '../../http.helper';
import { DriverUsecases } from '../module';
import { AddDriverBodyDto } from '../rest/input.dto';

@Resolver()
export class DriverResolver {
  constructor(
    @Inject('DriverUsecases')
    private readonly usecases: DriverUsecases,
  ) {}

  @Query()
  async driver(@Args('code') code: string) {
    const result = await this.usecases.getDriver.execute({ code });
    return result.getOrElse(throwHttpException);
  }

  @Query()
  async drivers() {
    const result = await this.usecases.getAllDrivers.execute();
    return result.getOrElse(throwHttpException);
  }

  @Mutation()
  async addDriver(@Args('driver') driver: AddDriverBodyDto) {
    const result = await this.usecases.addDriver.execute({ driver });
    result.getOrElse(throwHttpException);
    return 'success';
  }
}
