import { Driver } from './entity';

export abstract class DriverRepository {
  abstract findAll(): Promise<Driver[]>;
  abstract find(code: string): Promise<Driver | null>;
  abstract persist(driver: Driver): Promise<void>;
}
