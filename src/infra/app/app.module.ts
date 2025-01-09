import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DriverModule } from './driver/module';
import { RolesGuard } from './roles.helper';

@Module({
  imports: [DriverModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
