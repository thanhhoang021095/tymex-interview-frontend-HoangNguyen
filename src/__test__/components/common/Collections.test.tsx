import { render, screen } from '@testing-library/react';
import React from 'react';
import { IProduct } from 'src/types/model';

import { DEFAULT_LIMIT } from '@/lib/constants';

import Collections from '../../../components/common/Collections';
import useFetchData from '../../../hooks/useFetchData';

jest.mock('../../../hooks/useFetchData', () => jest.fn());

describe('Collections Component', () => {
  const mockFetchData = jest.fn();
  const mockOnChangeFilter = jest.fn();

  const mockFilterParams = {
    limit: DEFAULT_LIMIT,
    search: ''
  };

  beforeEach(() => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
      fetchData: mockFetchData
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Collections filterParams={mockFilterParams} onChangeFilter={mockOnChangeFilter} />);

    expect(screen.getByText('View more')).toBeInTheDocument();
  });

  it('displays an error message if there is an error', () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: [],
      error: 'Some error occurred',
      isLoading: false,
      fetchData: mockFetchData
    });

    render(<Collections filterParams={mockFilterParams} onChangeFilter={mockOnChangeFilter} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders a list of products', () => {
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

    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: mockData,
      error: null,
      isLoading: false,
      fetchData: mockFetchData
    });

    render(<Collections filterParams={mockFilterParams} onChangeFilter={mockOnChangeFilter} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('disables the "View more" button when loading', () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: [],
      error: null,
      isLoading: true,
      fetchData: mockFetchData
    });

    render(<Collections filterParams={mockFilterParams} onChangeFilter={mockOnChangeFilter} />);

    // eslint-disable-next-line testing-library/no-node-access
    const viewMoreButton = screen.getByText('View more').closest('button'); // Find the button element
    expect(viewMoreButton).toBeDisabled();
  });
});
