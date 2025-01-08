import { Module } from '@nestjs/common';
import { DriverRepository } from 'src/core/driver/repository';
import { AddDriverUsecase } from 'src/core/driver/usecase/addDriver';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';
import { GetDriverUsecase } from 'src/core/driver/usecase/getDriver';
import { DriverRepositoryInMemory } from 'src/infra/repository/driver/inmemory';
import { DriverController } from './controller';

export type DriverUsecases = ReturnType<typeof createUsecases>;

const createUsecases = (repo: DriverRepository) => ({
  getAllDrivers: new GetAllDriversUsecase(repo),
  getDriver: new GetDriverUsecase(repo),
  addDriver: new AddDriverUsecase(repo),
});

@Module({
  controllers: [DriverController],
  providers: [
    { provide: DriverRepository, useClass: DriverRepositoryInMemory },
    {
      provide: 'DriverUsecases',
      useFactory: createUsecases,
      inject: [DriverRepository],
    },
  ],
})
export class DriverModule {}
