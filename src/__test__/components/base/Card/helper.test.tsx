/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getRandomNumber,
  mapAuthorStatus,
  randomCardStyle
} from '../../../../components/base/Card/helper'; // Adjust the path if needed

describe('getRandomNumber', () => {
  it('should return a number between 1 and 5 for valid indices', () => {
    for (let i = 0; i < 10; i++) {
      const randomNumber = getRandomNumber(i);
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(5);
    }
  });

  it('should return the same result for the same index', () => {
    expect(getRandomNumber(42)).toBe(getRandomNumber(42));
    expect(getRandomNumber(9999)).toBe(getRandomNumber(9999));
  });
});

describe('mapAuthorStatus', () => {
  it('should return the correct status icon path', () => {
    expect(mapAuthorStatus('online')).toBe('icons/online-status.svg');
    expect(mapAuthorStatus('offline')).toBe('icons/offline-status.svg');
    expect(mapAuthorStatus('away')).toBe('icons/away-status.svg');
  });

  it('should handle unexpected statuses gracefully', () => {
    expect(mapAuthorStatus('unknown' as any)).toBe('icons/unknown-status.svg');
  });
});

describe('randomCardStyle', () => {
  it('should return deterministic styles for the same index', () => {
    const style1 = randomCardStyle(42);
    const style2 = randomCardStyle(42);

    expect(style1).toEqual(style2);
  });

  it('should generate a valid character image path and background', () => {
    const style = randomCardStyle(42);

    expect(style.characterImg).toMatch(/images\/character_\d\.svg/);
    expect(style.background).toMatch(/linear-gradient\(.+\)/);
  });

  it('should produce different results for different indices', () => {
    const style1 = randomCardStyle(42);
    const style2 = randomCardStyle(43);

    expect(style1).not.toEqual(style2);
  });
});
