import { GetDriverUsecase } from 'src/core/driver/usecase/getDriver';
import { driverFactory } from 'test/__fixture__/driver/entity';

const setup = () => {
  const driverRepository = { findAll: jest.fn(), find: jest.fn() };
  const usecase = new GetDriverUsecase(driverRepository);
  return { usecase, params: { driverRepository } };
};

describe('GetDriver Usecase', () => {
  it('should return driver from repository', async () => {
    // Given
    const {
      usecase,
      params: { driverRepository },
    } = setup();
    const driver = driverFactory.build();
    driverRepository.find.mockResolvedValue(driver);

    // When
    const result = await usecase.execute('code');

    // Then
    expect(result).toEqual(driver);
  });
});
