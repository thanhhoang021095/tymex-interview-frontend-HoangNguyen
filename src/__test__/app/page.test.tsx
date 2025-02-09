import { render, screen } from '@testing-library/react';

import HomePage from '../../app/page';

jest.mock('@/components/common/Banner', () =>
  jest.fn(() => <div data-testid="banner">Mocked Banner</div>)
);
jest.mock('@/components/common/Products', () =>
  jest.fn(() => <div data-testid="products">Mocked Products</div>)
);

describe('HomePage Component', () => {
  it('renders the HomePage with Banner and Products', () => {
    render(<HomePage />);

    // Verify that the Banner component is rendered
    expect(screen.getByTestId('banner')).toBeInTheDocument();

    // Verify that the Products component is rendered
    expect(screen.getByTestId('products')).toBeInTheDocument();

    // Check if the background image is applied
    const homePageElement = screen.getByTestId('home-page');
    expect(homePageElement).toHaveClass('bg-[url(/images/content_bg.jpg)]');
  });
});
