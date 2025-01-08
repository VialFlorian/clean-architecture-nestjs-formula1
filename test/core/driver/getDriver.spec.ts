import { mock } from 'jest-mock-extended';
import { DriverRepository } from 'src/core/driver/repository';
import { GetDriverUsecase } from 'src/core/driver/usecase/getDriver';
import { driverFactory } from 'test/__fixture__/driver/entity';

const setup = () => {
  const driverRepository = mock<DriverRepository>();
  const usecase = new GetDriverUsecase(driverRepository);
  return { usecase, params: { driverRepository } };
};

describe('GetDriver Usecase', () => {
  it('should return driver', async () => {
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
    expect(result.isOk()).toEqual(true);
    expect(result.value).toEqual(driver);
  });

  it('should return error of type notfound-error', async () => {
    // Given
    const {
      usecase,
      params: { driverRepository },
    } = setup();
    driverRepository.find.mockResolvedValue(null);

    // When
    const result = await usecase.execute('code');

    // Then
    expect(result.isOk()).toEqual(false);
    expect(result.error?.type).toEqual('notfound-error');
  });

  it('should return error of type unexpected-error', async () => {
    // Given
    const {
      usecase,
      params: { driverRepository },
    } = setup();
    driverRepository.find.mockRejectedValue(new Error());

    // When
    const result = await usecase.execute('code');

    // Then
    expect(result.isOk()).toEqual(false);
    expect(result.error?.type).toEqual('unexpected-error');
  });
});
