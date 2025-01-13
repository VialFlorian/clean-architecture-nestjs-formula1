import { Driver } from 'src/core/driver/entity';
import { DriverRepository } from 'src/core/driver/repository';
import * as data from '../../datasources/inmemory/__driver__.json';

type DriverRaw = (typeof data)['MRData']['DriverTable']['Drivers'][0];
type DriverModel = Omit<DriverRaw, 'permanentNumber' | 'url'>;

export class DriverRepositoryInMemory implements DriverRepository {
  private data = data.MRData.DriverTable.Drivers as DriverModel[];

  find(code: string) {
    const driver = this.data.find((driver) => driver.code === code);
    if (!driver) return Promise.resolve(null);

    return Promise.resolve({
      code: driver.code,
      firstName: driver.givenName,
      lastName: driver.familyName,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
    });
  }

  findByName(_: string, lastName: string): Promise<Driver | null> {
    const driver = this.data.find((driver) => driver.driverId === lastName.toLowerCase());
    if (!driver) return Promise.resolve(null);

    return Promise.resolve({
      code: driver.code,
      firstName: driver.givenName,
      lastName: driver.familyName,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
    });
  }

  findAll() {
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

  persist(driver: Driver) {
    this.data.push({
      driverId: driver.lastName,
      code: driver.code,
      givenName: driver.firstName,
      familyName: driver.lastName,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
    });
    return Promise.resolve();
  }
}
