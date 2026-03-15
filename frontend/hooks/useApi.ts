'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/lib/api';
import type { AxiosRequestConfig } from 'axios';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(url: string, config?: AxiosRequestConfig): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  // Stable ref for config to avoid re-running the effect when a new object is passed inline
  const configRef = useRef(config);
  useEffect(() => { configRef.current = config; });

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get<T>(url, configRef.current)
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err?.response?.data?.message ?? err?.message ?? 'An unexpected error occurred.'
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url, tick]);

  return { data, loading, error, refetch };
}
