import { renderHook, act } from '@testing-library/react';
import { QueryParamsType } from 'src/types/queryParams';

import { INIT_FILTER_PARAMS } from '@/lib/constants';

import { useFilterProduct } from './useFilterProduct';

describe('useFilterProduct', () => {
  it('should initialize with the default filter values', () => {
    const { result } = renderHook(() => useFilterProduct());

    expect(result.current.filter).toEqual(INIT_FILTER_PARAMS);
  });

  it('should update the filter values when onChangeFilter is called', () => {
    const { result } = renderHook(() => useFilterProduct());

    const newFilter: QueryParamsType = { search: 'test' };

    act(() => {
      result.current.onChangeFilter(newFilter);
    });

    expect(result.current.filter).toEqual({
      ...INIT_FILTER_PARAMS,
      ...newFilter
    });
  });

  it('should preserve previous filter values when updating', () => {
    const { result } = renderHook(() => useFilterProduct());

    const initialUpdate: QueryParamsType = { category: 'Epic' };
    const secondUpdate: QueryParamsType = { tier: 'Basic' };

    act(() => {
      result.current.onChangeFilter(initialUpdate);
    });

    expect(result.current.filter).toEqual({
      ...INIT_FILTER_PARAMS,
      ...initialUpdate
    });

    act(() => {
      result.current.onChangeFilter(secondUpdate);
    });

    expect(result.current.filter).toEqual({
      ...INIT_FILTER_PARAMS,
      ...initialUpdate,
      ...secondUpdate
    });
  });
});
