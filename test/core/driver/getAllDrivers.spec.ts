import { mock } from 'jest-mock-extended';
import { DriverRepository } from 'src/core/driver/repository';
import { GetAllDriversUsecase } from 'src/core/driver/usecase/getAllDrivers';
import { driverFactory } from 'test/__fixture__/driver/entity';

const setup = () => {
  const driverRepository = mock<DriverRepository>();
  const usecase = new GetAllDriversUsecase(driverRepository);
  return { usecase, params: { driverRepository } };
};

describe('GetAllDrivers Usecase', () => {
  it('should return drivers', async () => {
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
    expect(result.isOk()).toEqual(true);
    expect(result.value).toEqual(drivers);
  });

  it('should return error of type unexpected-error', async () => {
    // Given
    const {
      usecase,
      params: { driverRepository },
    } = setup();
    driverRepository.findAll.mockRejectedValue(new Error());

    // When
    const result = await usecase.execute();

    // Then
    expect(result.isOk()).toEqual(false);
    expect(result.error?.type).toEqual('unexpected-error');
  });
});
