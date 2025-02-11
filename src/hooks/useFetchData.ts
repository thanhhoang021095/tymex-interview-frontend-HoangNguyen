/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { IProduct } from 'src/types/model';
import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '@/lib/constants';
import { parseQueryParams } from '@/lib/utils/parseQueryParams';

type FetchState = {
  data: IProduct[];
  isLoading: boolean;
  error: string | null;
};

const JSON_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

function useFetchData(filterParam: QueryParamsType) {
  const [state, setState] = useState<FetchState>({
    data: Array.from({ length: DEFAULT_LIMIT }).map((i) => ({
      id: i
    })) as unknown as IProduct[],
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async (params?: QueryParamsType) => {
    setState((prevState: any) => {
      const mockEmptyData = Array.from({ length: params?.limit || DEFAULT_LIMIT }).map((i) => ({
        id: i
      }));

      return {
        data: params?.limit ? [...(prevState.data || []), ...mockEmptyData] : prevState.data,
        isLoading: true,
        error: null
      };
    });

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
    } catch (error: any) {
      setState((prevState) => ({
        data: prevState.data,
        isLoading: false,
        error: error?.message
      }));
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
