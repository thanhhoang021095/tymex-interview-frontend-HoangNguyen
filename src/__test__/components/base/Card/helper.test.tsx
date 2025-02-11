import {
  getRandomNumber,
  mapAuthorStatus,
  randomCardStyle
} from '../../../../components/base/Card/helper';

describe('Helper Functions', () => {
  describe('getRandomNumber', () => {
    it('returns a number between 1 and 5 (inclusive)', () => {
      const results = Array.from({ length: 100 }, getRandomNumber); // Call the function 100 times
      results.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('mapAuthorStatus', () => {
    it('maps author online status to the correct icon path', () => {
      const status = 'online';
      const expectedPath = 'icons/online-status.svg';

      expect(mapAuthorStatus(status)).toBe(expectedPath);
    });

    it('handles different status values correctly', () => {
      const statuses = ['online', 'offline', 'busy', 'away'];
      statuses.forEach((status) => {
        const expectedPath = `icons/${status}-status.svg`;
        expect(mapAuthorStatus(status)).toBe(expectedPath);
      });
    });
  });

  describe('randomCardStyle', () => {
    it('returns a valid character image and background', () => {
      const style = randomCardStyle();

      // Check characterImg
      expect(style.characterImg).toMatch(/images\/character_\d\.svg/);

      // Check background
      const validBackgrounds = [
        'linear-gradient(90.13deg, rgb(221, 90, 254) 0%, rgb(99, 102, 241) 100%)',
        'linear-gradient(90.13deg, rgb(255, 87, 34) 0%, rgb(121, 85, 72) 100%)',
        'linear-gradient(90.13deg, rgb(0, 150, 136) 0%, rgb(3, 169, 244) 100%)',
        'linear-gradient(90.13deg, rgb(254, 90, 90) 0%, rgb(241, 99, 210) 100%)',
        'linear-gradient(90.13deg, rgb(63, 81, 181) 0%, rgb(76, 175, 80) 100%)'
      ];
      expect(validBackgrounds).toContain(style.background);
    });

    it('calls getRandomNumber twice', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.2); // Mock random number generation
      const style = randomCardStyle();

      expect(style.characterImg).toBe('images/character_2.svg');
      expect(style.background).toBe(
        'linear-gradient(90.13deg, rgb(255, 87, 34) 0%, rgb(121, 85, 72) 100%)'
      );

      jest.restoreAllMocks();
    });
  });
});
