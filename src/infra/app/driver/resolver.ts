import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { throwHttpException } from '../http.helper.js';
import { DriverUsecases } from './module';

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
}
