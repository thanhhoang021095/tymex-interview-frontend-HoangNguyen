'use client';

import { useState } from 'react';
import { QueryParamsType } from 'src/types/queryParams';

import { INIT_FILTER_PARAMS } from '@/lib/constants';

export const useFilterProduct = () => {
  const [filter, setFilter] = useState<QueryParamsType>(INIT_FILTER_PARAMS);

  const onChangeFilter = (options: QueryParamsType) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        ...options
      };
    });
  };

  return { filter, onChangeFilter };
};
