import { Factory } from 'fishery';
import { Driver } from 'src/core/driver/entity';
import { generateRandomString, getRandomValueFromArray } from '../utils';

const generateRandomStringDate = () => getRandomValueFromArray(['1996-03-23', '1981-07-29', '2005-05-08']);

const generateRandomNationality = () => getRandomValueFromArray(['French', 'Thai', 'Spanish', 'British']);

export const driverFactory = Factory.define<Driver>(() => ({
  code: generateRandomString(3),
  firstName: generateRandomString(),
  lastName: generateRandomString(),
  dateOfBirth: generateRandomStringDate(),
  nationality: generateRandomNationality(),
}));
