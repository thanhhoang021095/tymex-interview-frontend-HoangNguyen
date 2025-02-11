/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { INIT_FILTER_PARAMS } from '@/lib/constants';

import Filter from '../../../components/common/Filter';

const mockOnChangeFilter = jest.fn();

const defaultFilterParams = INIT_FILTER_PARAMS;

jest.mock('../../../components/base/Slider/index', () => (props: any) => (
  <input
    type="range"
    data-testid={props['data-testid']}
    value={props.value[1]} // Second value in the range
    onChange={(e) => {
      const newValue = Number(e.target.value);
      props.onChange([props.value[0], newValue]); // Simulate range update
    }}
    onMouseUp={(e: any) => {
      const newValue = Number(e.target.value);
      props.onChangeComplete([props.value[0], newValue]); // Simulate final range value
    }}
  />
));

describe('Filter Component', () => {
  beforeEach(() => {
    mockOnChangeFilter.mockClear();
  });

  it('renders the filter component correctly', () => {
    render(<Filter filterParams={defaultFilterParams} onChangeFilter={mockOnChangeFilter} />);

    expect(screen.getByPlaceholderText('Quick search')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();

    const resetButtons = screen.getAllByTestId('reset-button');
    expect(resetButtons[0]).toBeInTheDocument();
  });

  it('calls onChangeFilter when search input changes', async () => {
    render(<Filter filterParams={defaultFilterParams} onChangeFilter={mockOnChangeFilter} />);

    const searchInput = screen.getByPlaceholderText('Quick search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(screen.getByDisplayValue('test search')).toBeInTheDocument();

    // Wait for debounce delay
    await waitFor(() => {
      expect(mockOnChangeFilter).toHaveBeenCalledWith({ search: 'test search' });
    });
  });

  it('updates price range on slider change', () => {
    render(<Filter filterParams={defaultFilterParams} onChangeFilter={mockOnChangeFilter} />);

    const slider = screen.getByTestId('price-slider');

    fireEvent.change(slider, { target: { value: 500 } });
    fireEvent.mouseUp(slider);

    expect(mockOnChangeFilter).toHaveBeenCalledWith({ priceRange: [0, 100] });
  });

  it('resets the filter when reset button is clicked', () => {
    render(<Filter filterParams={defaultFilterParams} onChangeFilter={mockOnChangeFilter} />);

    const resetButtons = screen.getAllByTestId('reset-button');
    expect(resetButtons[0]).toBeInTheDocument();
    fireEvent.click(resetButtons[0]);

    expect(mockOnChangeFilter).toHaveBeenCalledWith(INIT_FILTER_PARAMS);
  });
});
