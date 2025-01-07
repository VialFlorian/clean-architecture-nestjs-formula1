import { GetAllDriversUsecase } from 'src/core/driver/getAllDrivers.usecase';
import { driverFactory } from 'test/__fixture__/driver/entity';

const setup = () => {
  const driverRepository = { findAll: jest.fn() };
  const usecase = new GetAllDriversUsecase(driverRepository);
  return { usecase, params: { driverRepository } };
};

describe('GetAllDrivers Usecase', () => {
  it('should return drivers from repository', async () => {
    // Given
    const {
      usecase,
      params: { driverRepository },
    } = setup();
    const drivers = driverFactory.buildList(3);
    driverRepository.findAll.mockResolvedValue(drivers);

    // When
    const result = await usecase.execute();

    // Then
    expect(result).toEqual(drivers);
  });
});
