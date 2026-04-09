import { useState, useEffect, useCallback, useRef } from 'react';

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const optionsString = JSON.stringify(options);
  const fetchData = useCallback(async () => {
    if (!url) return;
    abortControllerRef.current = new AbortController();
    const cacheKey = `${url}:${optionsString}`;

    // Проверка кеша
    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, { ...options, signal: abortControllerRef.current.signal });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();

      cache.set(cacheKey, { data: result, timestamp: Date.now() });
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, optionsString, options]);

  useEffect(() => {
    fetchData();
    return () => abortControllerRef.current?.abort();
  }, [fetchData]);

  return { data, loading, error };
}