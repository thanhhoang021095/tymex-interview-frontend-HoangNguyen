import { IProduct } from 'src/types/model';

const LIMIT_NUMBER = 5;

export const getRandomNumber = (index: number): number => {
  // Simple deterministic random number generation
  // 12345 is an arbitrary multiplier to introduce variability
  // 6789 is an arbitrary modulus to reduce the scale of the result
  // % 5 ensures the final result is in the range 0-4, and +1 shifts it to 1-5
  const random = (((index * 12345) % 6789) % LIMIT_NUMBER) + 1;

  return random;
};

export const mapAuthorStatus = (status: IProduct['author']['onlineStatus']): string => {
  return `icons/${status}-status.svg`;
};

export const randomCardStyle = (index: number) => {
  const num1 = getRandomNumber(index);
  const num2 = getRandomNumber(index);

  const bgCollections = {
    1: 'linear-gradient(90.13deg, rgb(221, 90, 254) 0%, rgb(99, 102, 241) 100%)',
    2: 'linear-gradient(90.13deg, rgb(255, 87, 34) 0%, rgb(121, 85, 72) 100%)',
    3: 'linear-gradient(90.13deg, rgb(0, 150, 136) 0%, rgb(3, 169, 244) 100%)',
    4: 'linear-gradient(90.13deg, rgb(254, 90, 90) 0%, rgb(241, 99, 210) 100%)',
    5: 'linear-gradient(90.13deg, rgb(63, 81, 181) 0%, rgb(76, 175, 80) 100%)'
  } as Record<string, string>;

  return {
    characterImg: `images/character_${num1}.svg`,
    background: bgCollections[`${num2}`]
  };
};
