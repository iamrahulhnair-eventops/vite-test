import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';


interface UseIntersectionApiResult<T> {
  ref: RefObject<HTMLElement | null>;
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseIntersectionApiOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  fetchOptions?: RequestInit;
}

export function useIntersectionApi<T = any>(
  apiEndpoint: string,
  options: UseIntersectionApiOptions = {}
): UseIntersectionApiResult<T> {
  const ref = useRef<HTMLElement>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!ref.current || !apiEndpoint) return;
    let observer: IntersectionObserver;
    let didCancel = false;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && !hasFetched) {
        setLoading(true);
        setError(null);
        fetch(apiEndpoint, options.fetchOptions)
          .then(async (res) => {
            if (!res.ok) throw new Error(await res.text());
            return res.json();
          })
          .then((json) => {
            if (!didCancel) setData(json);
          })
          .catch((err) => {
            if (!didCancel) setError(err.message || 'Error fetching data');
          })
          .finally(() => {
            if (!didCancel) setLoading(false);
            setHasFetched(true);
          });
      }
    };

    observer = new IntersectionObserver(handleIntersect, {
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold ?? 0,
    });
    observer.observe(ref.current);

    return () => {
      didCancel = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiEndpoint, options.root, options.rootMargin, options.threshold, options.fetchOptions]);

  return { ref, data, loading, error };
}
