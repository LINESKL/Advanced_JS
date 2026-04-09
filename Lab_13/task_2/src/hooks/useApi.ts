import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setTrigger] = useState(0);
  const isMounted = useRef(true);
  const abortController = useRef(null);

  const depsWithApi = [apiFunction, ...dependencies];
  const execute = useCallback(async () => {
    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction();
      if (isMounted.current) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (isMounted.current) {
        setError(err.message || 'An error occurred');
        setData(null);
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, depsWithApi);

  useEffect(() => {
    isMounted.current = true;
    execute();
    return () => {
      isMounted.current = false;
      if (abortController.current) abortController.current.abort();
    };
  }, [execute]);

  const refetch = useCallback(() => setTrigger(t => t + 1), []);

  return { data, loading, error, refetch };
}