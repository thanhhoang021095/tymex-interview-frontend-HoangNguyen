import { renderHook, act } from '@testing-library/react';

import { useToggle } from './useToggle';

describe('useToggle Hook', () => {
  it('should initialize with toggle as false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.toggle).toBe(false);
  });

  it('should toggle the value when handleToggle is called', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.toggle).toBe(true);

    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.toggle).toBe(false);
  });

  it('should set toggle to a specific value when setStateToggle is called', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.setStateToggle(true);
    });
    expect(result.current.toggle).toBe(true);

    act(() => {
      result.current.setStateToggle(false);
    });
    expect(result.current.toggle).toBe(false);
  });
});
