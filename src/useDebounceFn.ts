import { useEffect } from 'react';

/**
 * Calls a function `fn` with `value` after `delay` milliseconds.
 * Cleans up on value change or unmount.
 */
export const useDebounceFunction = <T>(
  fn: (value: T) => void,
  value: T,
  delay = 500
): void => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fn(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, fn, delay]);
};
