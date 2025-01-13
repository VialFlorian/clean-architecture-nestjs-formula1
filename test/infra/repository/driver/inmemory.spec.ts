import { DriverRepositoryInMemory } from 'src/infra/repository/driver/inmemory';
import { driverFactory } from 'test/__fixture__/driver/entity';

const setup = () => {
  const repository = new DriverRepositoryInMemory();
  return { repository };
};

describe('DriverRepositoryInMemory', () => {
  it('findAll', async () => {
    // Given
    const { repository } = setup();

    // When
    const result = await repository.findAll();

    // Then
    expect(result).toHaveLength(24);
  });

  it('find', async () => {
    // Given
    const { repository } = setup();

    // When
    const result = await repository.find('HAM');

    // Then
    expect(result).toEqual({
      code: 'HAM',
      firstName: 'Lewis',
      lastName: 'Hamilton',
      dateOfBirth: '1985-01-07',
      nationality: 'British',
    });
  });

  it('findByName', async () => {
    // Given
    const { repository } = setup();
    const firstName = 'Lewis';
    const lastName = 'Hamilton';

    // When
    const result = await repository.findByName(firstName, lastName);

    // Then
    expect(result).toEqual({
      code: 'HAM',
      firstName: 'Lewis',
      lastName: 'Hamilton',
      dateOfBirth: '1985-01-07',
      nationality: 'British',
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
    expect(persistedDriver).toEqual(driver);
  });
});
