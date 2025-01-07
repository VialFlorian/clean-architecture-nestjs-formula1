import { Injectable } from '@nestjs/common';
import { Driver } from 'src/core/driver/entity';
import { DriverRepository } from 'src/core/driver/repository';
import * as data from './__data__.json';

type DriverRaw = (typeof data)['MRData']['DriverTable']['Drivers'][0];
type DriverModel = Omit<DriverRaw, 'driverId' | 'permanentNumber' | 'url'>;

@Injectable()
export class DriverRepositoryInMemory implements DriverRepository {
  private data = data.MRData.DriverTable.Drivers as DriverModel[];

  find(code: string): Promise<Driver> {
    const driver = this.data.find((driver) => driver.code === code);
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
      this.data.map((driver) => ({
        code: driver.code,
        firstName: driver.givenName,
        lastName: driver.familyName,
        dateOfBirth: driver.dateOfBirth,
        nationality: driver.nationality,
      })),
    );
  }

  persist(driver: Driver): Promise<void> {
    this.data.push({
      code: driver.code,
      givenName: driver.firstName,
      familyName: driver.lastName,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
    });
    return Promise.resolve();
  }
}
