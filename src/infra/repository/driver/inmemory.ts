import { Injectable } from '@nestjs/common';
import { Driver } from 'src/core/driver/entity';
import { DriverRepository } from 'src/core/driver/repository';
import * as data from './__data__.json';

@Injectable()
export class DriverRepositoryInMemory implements DriverRepository {
  private data = data;

  find(code: string): Promise<Driver> {
    const driver = this.data.MRData.DriverTable.Drivers.find(
      (driver) => driver.code === code,
    );

    if (!driver) return null;

    return Promise.resolve({
      code: driver.code,
      firstName: driver.givenName,
      lastName: driver.familyName,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
    });
  }

  findAll(): Promise<Driver[]> {
    return Promise.resolve(
      this.data.MRData.DriverTable.Drivers.map((driver) => ({
        code: driver.code,
        firstName: driver.givenName,
        lastName: driver.familyName,
        dateOfBirth: driver.dateOfBirth,
        nationality: driver.nationality,
      })),
    );
  }
}
