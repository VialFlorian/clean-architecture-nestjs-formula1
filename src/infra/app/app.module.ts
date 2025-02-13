import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
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
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
            outputAs: 'class',
          },
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
