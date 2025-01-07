import { Module } from '@nestjs/common';
import { DriverRepository } from 'src/core/driver/repository';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';
import { GetDriverUsecase } from 'src/core/driver/usecase/getDriver';
import { DriverRepositoryInMemory } from 'src/infra/repository/driver/inmemory';
import { DriverController } from './controller';

@Module({
  controllers: [DriverController],
  providers: [
    { provide: DriverRepository, useClass: DriverRepositoryInMemory },
    {
      provide: 'GetAllDriversUsecase',
      useFactory: (repo: DriverRepository) => new GetAllDriversUsecase(repo),
      inject: [DriverRepository],
    },
    {
      provide: 'GetDriverUsecase',
      useFactory: (repo: DriverRepository) => new GetDriverUsecase(repo),
      inject: [DriverRepository],
    },
  ],
})
export class DriverModule {}
