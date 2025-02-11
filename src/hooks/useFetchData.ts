'use client';

import { useState, useEffect, useCallback } from 'react';
import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '@/lib/constants';
import { parseQueryParams } from '@/lib/utils/parseQueryParams';

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

const JSON_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

function useFetchData<T>(filterParam: QueryParamsType) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async (params?: QueryParamsType) => {
    setState({ data: null, isLoading: true, error: null });

    const queryUrl = parseQueryParams(params as QueryParamsType);

    const url = `${JSON_SERVER_URL}/products${queryUrl}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
