import { cn } from './cn';

describe('cn function', () => {
  it('should merge class lists correctly', () => {
    const result = cn('text-lg', 'font-bold');
    expect(result).toBe('text-lg font-bold');
  });

  it('should remove duplicate classes', () => {
    const result = cn('text-lg', 'text-lg');
    expect(result).toBe('text-lg');
  });

  it('should prioritize the last conflicting class', () => {
    const result = cn('text-lg', 'text-sm');
    expect(result).toBe('text-sm');
  });

  it('should handle conditional classes using clsx syntax', () => {
    const result = cn('text-lg', { 'text-sm': true, 'text-xl': false });
    expect(result).toBe('text-sm');
  });

  it('should handle empty inputs gracefully', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle undefined and null values', () => {
    const result = cn('text-lg', undefined, null, 'font-bold');
    expect(result).toBe('text-lg font-bold');
  });

  it('should merge Tailwind classes correctly with twMerge', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2'); // twMerge should resolve conflicting padding classes
  });

  it('should handle arrays of class names', () => {
    const result = cn(['text-lg', 'font-bold']);
    expect(result).toBe('text-lg font-bold');
  });
});
