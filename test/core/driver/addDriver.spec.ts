import { mock } from 'jest-mock-extended';
import { DriverRepository } from 'src/core/driver/repository';
import { AddDriverUsecase } from 'src/core/driver/usecase/addDriver';
import { driverFactory } from 'test/__fixture__/driver/entity';

const setup = () => {
  const driverRepository = mock<DriverRepository>();
  const usecase = new AddDriverUsecase(driverRepository);
  return { usecase, params: { driverRepository } };
};

describe('AddDriver Usecase', () => {
  it('should call persist method of repository', async () => {
    // Given
    const {
      usecase,
      params: { driverRepository },
    } = setup();
    const driver = driverFactory.build();

    // When
    const result = await usecase.execute({ driver });

    // Then
    expect(result.isOk()).toEqual(true);
    expect(driverRepository.persist).toHaveBeenCalledTimes(1);
    expect(driverRepository.persist).toHaveBeenCalledWith(driver);
  });

  it('should return error of type unexpected-error', async () => {
    // Given
    const {
      usecase,
      params: { driverRepository },
    } = setup();
    const driver = driverFactory.build();
    driverRepository.persist.mockRejectedValue(new Error());

    // When
    const result = await usecase.execute({ driver });

    // Then
    expect(result.isOk()).toEqual(false);
    expect(result.error?.type).toEqual('unexpected-error');
  });
});
