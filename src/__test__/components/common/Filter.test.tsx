import { render, screen, fireEvent } from '@testing-library/react';
import debounce from 'lodash/debounce';
import { QueryParamsType } from 'src/types/queryParams';

import { INIT_FILTER_PARAMS } from '@/lib/constants';

import Filter from '../../../components/common/Filter';

jest.mock('lodash/debounce', () =>
  jest.fn((fn) => {
    fn.cancel = jest.fn();

    return fn;
  })
);

jest.mock('../../../components/base/Input', () =>
  jest.fn(({ onChange }) => <input data-testid="search-input" onChange={onChange} />)
);

jest.mock('../../../components/base/Slider', () =>
  jest.fn(({ onChange, onChangeComplete }) => (
    <div data-testid="price-slider">
      <button onClick={() => onChange([10, 100])}>Change Range</button>
      <button onClick={() => onChangeComplete([10, 100])}>Complete Range</button>
    </div>
  ))
);

jest.mock('../../../components/base/Select', () =>
  jest.fn(({ options, onChange }) => (
    <select data-testid="dropdown-select" onChange={(e) => onChange(e.target.value)}>
      {options.map((option: Record<string, string>) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ))
);

jest.mock('../../../components/base/Button', () =>
  jest.fn(({ children }) => <button data-testid="button">{children}</button>)
);

describe('Filter Component', () => {
  const mockOnChangeFilter = jest.fn();
  const mockFilterParams: QueryParamsType = {
    search: '',
    priceRange: [0, 1000],
    tier: 'All',
    theme: 'All',
    time: 'latest',
    priceSort: 'asc'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onChangeFilter when the search input changes', () => {
    render(<Filter filterParams={mockFilterParams} onChangeFilter={mockOnChangeFilter} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'New Search' } });

    expect(debounce).toHaveBeenCalled();
    expect(mockOnChangeFilter).toHaveBeenCalledWith({ search: 'New Search' });
  });

  it('calls onChangeFilter when price range changes', () => {
    render(<Filter filterParams={mockFilterParams} onChangeFilter={mockOnChangeFilter} />);

    const changeButton = screen.getByText('Change Range');
    fireEvent.click(changeButton);
    expect(mockOnChangeFilter).not.toHaveBeenCalled();

    const completeButton = screen.getByText('Complete Range');
    fireEvent.click(completeButton);
    expect(mockOnChangeFilter).toHaveBeenCalledWith({ priceRange: [10, 100] });
  });

  it('resets the filter when the Reset button is clicked', () => {
    render(<Filter filterParams={mockFilterParams} onChangeFilter={mockOnChangeFilter} />);

    const resetButton = screen.getByText('Reset filter');
    fireEvent.click(resetButton);

    expect(mockOnChangeFilter).toHaveBeenCalledWith(INIT_FILTER_PARAMS);
  });
});
