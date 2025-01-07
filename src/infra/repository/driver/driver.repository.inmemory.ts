import { Injectable } from '@nestjs/common';
import { Driver } from 'src/core/driver/driver.entity';
import { DriverRepository } from 'src/core/driver/driver.repository';
import * as driversData from './drivers.json';

@Injectable()
export class DriverRepositoryInMemory implements DriverRepository {
  find(code: string): Promise<Driver> {
    const driver = driversData.MRData.DriverTable.Drivers.find(
      (driver) => driver.code === code,
    );

    if (!driver) return null;

    return Promise.resolve({
      firstName: driver.givenName,
      lastName: driver.familyName,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
    });
  }

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
