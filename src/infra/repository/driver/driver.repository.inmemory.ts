import { Driver } from 'src/core/driver/driver.entity';
import * as driversData from './drivers.json';
import { Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/core/driver/driver.repository';

@Injectable()
export class DriverRepositoryInMemory implements DriverRepository {
  findAll(): Promise<Driver[]> {
    return Promise.resolve(
      driversData.MRData.DriverTable.Drivers.map((driver) => ({
        firstName: driver.givenName,
        lastName: driver.familyName,
        dateOfBirth: driver.dateOfBirth,
        nationality: driver.nationality,
      })),
    );
  }
}
