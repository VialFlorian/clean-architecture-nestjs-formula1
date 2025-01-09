import { Factory } from 'fishery';
import { Driver } from 'src/core/driver/entity';
import { generateRandomString, getRandomValueFromArray } from '../utils';

const generateRandomStringDate = () => getRandomValueFromArray(['1996-03-23', '1981-07-29', '2005-05-08']);

const generateRandomNationality = () => getRandomValueFromArray(['france', 'thailand', 'spain', 'united-kingdom']);

export const driverFactory = Factory.define<Driver>(() => {
  const lastName = generateRandomString();
  return {
    code: lastName.slice(0, 3).toUpperCase(),
    firstName: generateRandomString(),
    lastName,
    dateOfBirth: generateRandomStringDate(),
    nationality: generateRandomNationality(),
  };
});
