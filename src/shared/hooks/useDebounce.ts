import { useState, useEffect, useRef } from 'react';

/**
 * useDebounce
 *
 * Delays updating the returned value until `delay` ms have elapsed
 * without a new `value` being provided. Useful for search inputs.
 *
 * @example
 * const debouncedSearch = useDebounce(searchText, 300);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
