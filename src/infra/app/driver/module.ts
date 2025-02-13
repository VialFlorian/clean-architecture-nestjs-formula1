import { DynamicModule, Module } from '@nestjs/common';
import { DriverRepository } from 'src/core/driver/repository';
import { AddDriverUsecase } from 'src/core/driver/usecase/addDriver';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';
import { GetDriverUsecase } from 'src/core/driver/usecase/getDriver';
import { PrismaService } from 'src/infra/frameworks/prisma/prisma.service';
import { DriverRepositoryInMemory } from 'src/infra/repository/driver/inmemory';
import { DriverRepositoryPrisma } from 'src/infra/repository/driver/prisma';
import { DriverResolver } from './graphql/resolver';
import { DriverController } from './rest/controller';

export type DriverUsecases = ReturnType<typeof createUsecases>;

const createUsecases = (repo: DriverRepository) => ({
  getAllDrivers: new GetAllDriversUsecase(repo),
  getDriver: new GetDriverUsecase(repo),
  addDriver: new AddDriverUsecase(repo),
});

const createRepository = (config: DriverModuleConfig) => (prisma: PrismaService) => {
  return config.repository === 'prisma' ? new DriverRepositoryPrisma(prisma) : new DriverRepositoryInMemory();
};

interface DriverModuleConfig {
  repository: 'prisma' | 'inmemory';
}

@Module({})
export class DriverModule {
  static forRoot(options: DriverModuleConfig): DynamicModule {
    return {
      module: DriverModule,
      controllers: [DriverController],
      providers: [
        PrismaService,
        {
          provide: DriverRepository,
          useFactory: createRepository(options),
          inject: [PrismaService],
        },
        {
          provide: 'DriverUsecases',
          useFactory: createUsecases,
          inject: [DriverRepository],
        },
        DriverResolver,
      ],
    };
  }
}
