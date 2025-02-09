'use client';

import { useState, useEffect, useCallback } from 'react';
import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '@/lib/constants';

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

function useFetchData<T>(filterParam: QueryParamsType) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async (params?: QueryParamsType) => {
    setState({ data: null, isLoading: true, error: null });

    const queryUrl = '/api/products';

    try {
      const response = await fetch(queryUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setState({ data: result, isLoading: false, error: null });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setState({ data: null, isLoading: false, error: error?.message });
    }
  }, []);

  useEffect(() => {
    fetchData({
      limit: DEFAULT_LIMIT,
      ...filterParam
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParam]);

  return { ...state, fetchData };
}

export default useFetchData;
