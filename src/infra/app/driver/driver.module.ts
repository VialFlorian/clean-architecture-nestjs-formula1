import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { GetAllDriversUsecase } from 'src/core/driver/getAllDrivers.usecase';
import { DriverRepositoryInMemory } from 'src/infra/repository/driver/driver.repository.inmemory';
import { DriverRepository } from 'src/core/driver/driver.repository';

@Module({
  controllers: [DriverController],
  providers: [
    { provide: DriverRepository, useClass: DriverRepositoryInMemory },
    {
      provide: 'GetAllDriversUsecase',
      useFactory: (repo: DriverRepository) => new GetAllDriversUsecase(repo),
      inject: [DriverRepository],
    },
  ],
})
export class DriverModule {}
