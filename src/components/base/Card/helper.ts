import { IProduct } from 'src/types/model';

export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

export const mapAuthorStatus = (status: IProduct['author']['onlineStatus']): string => {
  return `icons/${status}-status.svg`;
};

export const randomCardStyle = () => {
  const num1 = getRandomNumber();
  const num2 = getRandomNumber();

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
