import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DriverModule } from './driver/module';
import { RolesGuard } from './roles.helper';

interface AppModuleConfig {
  repository: 'prisma' | 'inmemory';
}

@Module({})
export class AppModule {
  static forRoot(config: AppModuleConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.dev',
          isGlobal: true,
        }),
        DriverModule.forRoot({ repository: config.repository }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
      ],
    };
  }
}
