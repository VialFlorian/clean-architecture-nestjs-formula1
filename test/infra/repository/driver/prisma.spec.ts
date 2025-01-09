import { join } from 'path';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/infra/datasources/prisma/prisma.service';
import { DriverRepositoryPrisma } from 'src/infra/repository/driver/prisma';
import { driverFactory } from 'test/__fixture__/driver/entity';

const setup = () => {
  dotenv.config({ path: join(__dirname, '../../../.env.test') });
  const repository = new DriverRepositoryPrisma(new PrismaService());
  return { repository };
};

describe('DriverRepositoryPrisma', () => {
  it('findAll', async () => {
    // Given
    const { repository } = setup();

    // When
    const result = await repository.findAll();

    // Then
    expect(result).toHaveLength(33);
  });

  it('find', async () => {
    // Given
    const { repository } = setup();

    // When
    const result = await repository.find('ALO');

    // Then
    expect(result).toEqual({
      code: 'ALO',
      firstName: 'Fernando',
      lastName: 'Alonso',
      dateOfBirth: 'Wed Jul 29 1981 02:00:00 GMT+0200 (heure d’été d’Europe centrale)',
      nationality: 'spain',
    });
  });

  it('persist', async () => {
    // Given
    const { repository } = setup();
    const driver = driverFactory.build();

    // When
    await repository.persist(driver);

    // Then
    const persistedDriver = await repository.find(driver.code);
    expect(persistedDriver).toEqual({ ...driver, dateOfBirth: new Date(driver.dateOfBirth).toString() });
  });
});
