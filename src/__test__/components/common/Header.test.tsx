/* eslint-disable react/display-name */
import { render, screen, within } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { headerNavLinks } from '@/lib/constants';

import Header from '../../../components/common/Header';

// Mock next/navigation's usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

// Mock dependencies
jest.mock('../../../components/common/LanguageSwitcher', () => () => (
  <div>MockedLanguageSwitcher</div>
));
jest.mock(
  '../../../components/common/NavHeader/index',
  () =>
    ({ children }: { children: React.ReactNode }) => <div>{children}</div>
);
jest.mock(
  '../../../components/base/Button/index',
  () =>
    ({ children }: { children: React.ReactNode }) => <button>{children}</button>
);

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with navigation links and components', () => {
    // Mock the current pathname
    (usePathname as jest.Mock).mockReturnValue('/home');

    render(<Header />);

    // Check for navigation links in the desktop navigation section
    const desktopNav = screen.getByRole('navigation', { name: /desktop navigation/i });
    const list = within(desktopNav).getByRole('list');
    headerNavLinks.forEach(({ label }) => {
      expect(within(list).getByRole('link', { name: label })).toBeInTheDocument();
    });

    // Check for the Collect Wallet button
    expect(screen.getByText('Collect Wallet')).toBeInTheDocument();

    // Check for the LanguageSwitcher component
    expect(screen.getByText('MockedLanguageSwitcher')).toBeInTheDocument();
  });

  it('applies active styles to the correct navigation link', () => {
    const activePath = '/about';
    (usePathname as jest.Mock).mockReturnValue(activePath);

    render(<Header />);

    // Find the active link in the desktop navigation
    const desktopNav = screen.getByRole('navigation', { name: /desktop navigation/i });
    const list = within(desktopNav).getByRole('list');
    const activeLink = within(list).getByRole('link', {
      name: (_, element) => element?.textContent?.includes('About') as boolean
    });
    expect(activeLink).toHaveClass('inline-block p-2 transition-colors');
  });

  it('renders navigation links inside NavbarHeader on small screens', () => {
    (usePathname as jest.Mock).mockReturnValue('/home');

    render(<Header />);

    // Check if NavbarHeader contains a navigation link by its label
    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
    const list = within(mobileNav).getByRole('list');
    const navHeader = within(list).getByRole('link', { name: 'Home' });
    expect(navHeader).toBeInTheDocument();
  });
});
