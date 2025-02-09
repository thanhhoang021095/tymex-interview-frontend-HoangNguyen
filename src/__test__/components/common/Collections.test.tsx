import { render, screen, fireEvent } from '@testing-library/react';
import { IProduct } from 'server/model';
import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '@/lib/constants';

import Collections from '../../../components/common/Collections';

// Mocking the custom hook
jest.mock('../../../hooks/useFetchData', () => ({
  __esModule: true,
  default: jest.fn()
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockUseFetchData = require('../../../hooks/useFetchData').default;

describe('Collections Component', () => {
  const mockOnChangeFilter = jest.fn();
  const mockFetchData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFetchData.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      fetchData: mockFetchData
    });
  });

  const filterParams: QueryParamsType = { category: 'Epic' };

  it('renders loading state', () => {
    mockUseFetchData.mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
      fetchData: mockFetchData
    });

    render(<Collections filterParams={filterParams} onChangeFilter={mockOnChangeFilter} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseFetchData.mockReturnValueOnce({
      data: null,
      error: 'Failed to fetch',
      isLoading: false,
      fetchData: mockFetchData
    });

    render(<Collections filterParams={filterParams} onChangeFilter={mockOnChangeFilter} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders data and handles "View more" button click', () => {
    const mockData: IProduct[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        category: 'Epic',
        isFavorite: false,
        createdAt: 0,
        theme: 'Dark',
        tier: 'Basic',
        imageId: 0,
        author: {
          firstName: 'Bond',
          lastName: 'Hubner',
          email: 'bhubner14@blogtalkradio.com',
          gender: 'Male',
          avatar: 'https://robohash.org/exercitationemquiut.png?size=100x100&set=set1',
          onlineStatus: 'busy'
        }
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        category: 'Epic',
        isFavorite: false,
        createdAt: 0,
        theme: 'Dark',
        tier: 'Basic',
        imageId: 0,
        author: {
          firstName: 'Maggee',
          lastName: 'Parfitt',
          email: 'mparfittw@xrea.com',
          gender: 'Female',
          avatar: 'https://robohash.org/veniamporrocum.png?size=100x100&set=set1',
          onlineStatus: 'online'
        }
      }
    ];

    mockUseFetchData.mockReturnValueOnce({
      data: mockData,
      error: null,
      isLoading: false,
      fetchData: mockFetchData
    });

    render(<Collections filterParams={filterParams} onChangeFilter={mockOnChangeFilter} />);

    // Check for "View more" button
    const viewMoreButton = screen.getByText('View more');
    expect(viewMoreButton).toBeInTheDocument();

    // Simulate clicking the "View more" button
    fireEvent.click(viewMoreButton);

    expect(mockFetchData).toHaveBeenCalledWith({
      limit: mockData.length + DEFAULT_LIMIT,
      ...filterParams
    });

    expect(mockOnChangeFilter).toHaveBeenCalledWith({
      limit: mockData.length + DEFAULT_LIMIT
    });
  });
});
