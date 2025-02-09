import { render, screen } from '@testing-library/react';
import { QueryParamsType } from 'src/types/queryParams';

import Products from '../../../components/common/Products';
import { useFilterProduct } from '../../../hooks/useFilterProduct';

// Mock dependencies
jest.mock('../../../hooks/useFilterProduct', () => ({
  useFilterProduct: jest.fn()
}));

jest.mock('../../../components/common/Filter', () =>
  jest.fn(() => <div data-testid="filter">Filter Component</div>)
);
jest.mock('../../../components/common/Categories', () =>
  jest.fn(() => <div data-testid="categories">Categories Component</div>)
);
jest.mock('../../../components/common/Collections', () =>
  jest.fn(() => <div data-testid="collections">Collections Component</div>)
);

describe('Products Component', () => {
  const mockOnChangeFilter = jest.fn();
  const mockFilterParams: QueryParamsType = { category: 'Epic', limit: 10 };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the `useFilterProduct` hook
    (useFilterProduct as jest.Mock).mockReturnValue({
      filter: mockFilterParams,
      onChangeFilter: mockOnChangeFilter
    });
  });

  it('renders the Filter, Categories, and Collections components', () => {
    render(<Products />);

    // Verify Filter component is rendered
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toHaveTextContent('Filter Component');

    // Verify Categories component is rendered
    expect(screen.getByTestId('categories')).toBeInTheDocument();
    expect(screen.getByTestId('categories')).toHaveTextContent('Categories Component');

    // Verify Collections component is rendered
    expect(screen.getByTestId('collections')).toBeInTheDocument();
    expect(screen.getByTestId('collections')).toHaveTextContent('Collections Component');
  });

  it('renders the Image component', () => {
    render(<Products />);

    // Verify the Image is rendered
    const image = screen.getByAltText('waiver');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'images/waver.svg');
  });
});
