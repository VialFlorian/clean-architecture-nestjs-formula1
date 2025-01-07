import { randomBytes } from 'crypto';

export const generateRandomString = (length: number = 10) => {
  return randomBytes(length).toString('hex');
};

export const getRandomValueFromArray = <T>(array: T[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
