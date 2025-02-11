/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable newline-before-return */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import { IProduct } from 'server/model';

import Card from '../../../../components/base/Card/index';

jest.mock('../../../../components/base/Card/helper', () => ({
  randomCardStyle: jest.fn(() => ({
    characterImg: '/test-character-img.png',
    background: 'linear-gradient(to right, #000, #fff)'
  })),
  mapAuthorStatus: jest.fn((status) => `/test-status-${status}.png`)
}));

jest.mock('next/image', () => (props: any) => {
  // Mock the Image component from Next.js
  const { src, alt } = props;
  return <img src={src} alt={alt} />;
});

describe('Card Component', () => {
  const mockProduct: IProduct = {
    title: 'Test Product',
    author: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: '/test-avatar.png',
      onlineStatus: 'online',
      email: '',
      gender: ''
    },
    price: 100,
    isFavorite: true,
    category: 'Epic',
    id: 0,
    createdAt: 0,
    theme: 'Dark',
    tier: 'Basic',
    imageId: 0
  };

  it('renders the Card component with correct data', () => {
    render(<Card {...mockProduct} />);

    // Check for title
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // Check for price
    expect(screen.getByText(/100 ETH/i)).toBeInTheDocument();

    // Check for author name
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    // Check for category
    expect(screen.getByText(/Epic/i)).toBeInTheDocument();

    // Check for the favorite icon
    expect(screen.getByAltText('heart icon')).toBeInTheDocument();

    // Check for character image
    expect(screen.getByAltText('card image')).toHaveAttribute('src', '/test-character-img.png');

    // Check for author avatar
    expect(screen.getByAltText('author avatar')).toHaveAttribute('src', '/test-avatar.png');

    // Check for author status
    expect(screen.getByAltText('author status')).toHaveAttribute('src', '/test-status-online.png');
  });

  it('renders without the favorite icon if isFavorite is false', () => {
    const productWithoutFavorite = { ...mockProduct, isFavorite: false };

    render(<Card {...productWithoutFavorite} />);

    // Check that the favorite icon is not rendered
    expect(screen.queryByAltText('heart icon')).not.toBeInTheDocument();
  });
});
