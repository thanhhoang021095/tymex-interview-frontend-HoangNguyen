import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '../constants';

export const parseQueryParams = (params?: QueryParamsType): string => {
  let queryStr: string = '';

  queryStr += `_limit=${params?.limit || DEFAULT_LIMIT}`;

  if (typeof params?.search === 'string' && params?.search !== '') {
    queryStr += `&title_like=${params.search}`;
  }

  if (params?.priceRange && Array.isArray(params.priceRange)) {
    queryStr += `&price_gte=${params.priceRange[0]}&price_lte=${params.priceRange[1]}`;
  }

  if (typeof params?.tier === 'string' && params?.tier !== 'All') {
    queryStr += `&tier_like=${params.tier}`;
  }

  if (typeof params?.theme === 'string' && params?.theme !== 'All') {
    queryStr += `&theme_like=${params.theme}`;
  }

  // sort
  if (typeof params?.priceSort === 'string' || typeof params?.time === 'string') {
    queryStr += `&_sort=price,createdAt&_order=${params.priceSort},${params.time === 'latest' ? 'desc' : 'asc'}`;
  }

  if (typeof params?.category === 'string' && params?.category !== 'All') {
    queryStr += `&category_like=${params.category}`;
  }

  return `?${queryStr}`;
};
