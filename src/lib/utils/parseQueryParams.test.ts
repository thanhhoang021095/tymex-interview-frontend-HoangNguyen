import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '../constants';
import { parseQueryParams } from './parseQueryParams';

describe('parseQueryParams', () => {
  it('should return default limit if no params are provided', () => {
    const result = parseQueryParams();
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}`);
  });

  it('should handle the search parameter', () => {
    const params = { search: 'test' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}&title_like=test`);
  });

  it('should handle the priceRange parameter', () => {
    const params = { priceRange: [10, 50] };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}&price_gte=10&price_lte=50`);
  });

  it('should handle the tier parameter', () => {
    const params = { tier: 'Premium' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}&tier_like=Premium`);
  });

  it('should skip tier parameter if it is "All"', () => {
    const params = { tier: 'All' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}`);
  });

  it('should handle the theme parameter', () => {
    const params = { theme: 'Dark' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}&theme_like=Dark`);
  });

  it('should skip theme parameter if it is "All"', () => {
    const params = { theme: 'All' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}`);
  });

  it('should handle sorting by price and time', () => {
    const params = { priceSort: 'asc', time: 'latest' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}&_sort=price,createdAt&_order=asc,desc`);
  });

  it('should handle the category parameter', () => {
    const params = { category: 'Electronics' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}&category_like=Electronics`);
  });

  it('should skip category parameter if it is "All"', () => {
    const params = { category: 'All' };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(`?_limit=${DEFAULT_LIMIT}`);
  });

  it('should handle multiple parameters together', () => {
    const params = {
      search: 'test',
      priceRange: [10, 50],
      tier: 'Premium',
      theme: 'Dark',
      priceSort: 'desc',
      time: 'oldest',
      category: 'Electronics'
    };
    const result = parseQueryParams(params as QueryParamsType);
    expect(result).toBe(
      `?_limit=${DEFAULT_LIMIT}&title_like=test&price_gte=10&price_lte=50&tier_like=Premium&theme_like=Dark&_sort=price,createdAt&_order=desc,asc&category_like=Electronics`
    );
  });
});
