import { Driver } from '../driver/driver.entity';

export abstract class DriverRepository {
  abstract findAll(): Promise<Driver[]>;
}
