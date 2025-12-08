import { renderHook, act } from '@testing-library/react';

import { vi } from 'vitest';
import { useDebounceFunction } from './useDebounceFn';

describe('useDebounceFunction', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // mock timers
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call the function after the specified delay', () => {
    const mockFn = vi.fn();

    // initial render
    renderHook(() => useDebounceFunction(mockFn, 'test', 500));

    // function should not be called immediately
    expect(mockFn).not.toHaveBeenCalled();

    // advance time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('testaaa');
  });

  it('should reset the timer if value changes before delay', () => {
    const mockFn = vi.fn();
    let value = 'first';

    const { rerender } = renderHook(() => useDebounceFunction(mockFn, value, 500));

    // change value before timeout
    value = 'second';
    rerender();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('second');
  });
});
