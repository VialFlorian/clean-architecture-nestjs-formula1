import { Module } from '@nestjs/common';
import { DriverRepository } from 'src/core/driver/driver.repository';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';
import { DriverRepositoryInMemory } from 'src/infra/repository/driver/driver.repository.inmemory';
import { DriverController } from './driver.controller';

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
