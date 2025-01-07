import { DriverRepositoryInMemory } from 'src/infra/repository/driver/driver.repository.inmemory';

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
      firstName: 'Lewis',
      lastName: 'Hamilton',
      dateOfBirth: '1985-01-07',
      nationality: 'British',
    });
  });
});
