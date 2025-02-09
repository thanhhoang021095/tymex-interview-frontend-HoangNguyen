import { render, screen } from '@testing-library/react';

import { headerNavLinks } from '@/lib/constants';

import Header from '../../components/templates/MainLayout/Header';

// Mock dependencies
jest.mock('@/components/base/Button', () => jest.fn(({ children }) => <button>{children}</button>));
jest.mock('../../components/templates/MainLayout/LanguageSwitcher', () =>
  jest.fn(() => <div data-testid="language-switcher">Language Switcher</div>)
);

jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    )
  };
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

describe('Header Component', () => {
  const mockUsePathname = jest.requireMock('next/navigation').usePathname;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/'); // Mock the current path
  });

  it('renders all navigation links', () => {
    render(<Header />);

    headerNavLinks.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('highlights the active link based on the current pathname', () => {
    mockUsePathname.mockReturnValue('/active-link'); // Mock an active path
    render(<Header />);

    headerNavLinks.forEach(({ slug, label }) => {
      // eslint-disable-next-line testing-library/no-node-access
      const linkElement = screen.getByText(label).closest('a');
      if (slug === '/active-link') {
        expect(linkElement).toHaveClass('!text-purple');
      } else {
        expect(linkElement).not.toHaveClass('!text-purple');
      }
    });
  });

  it('renders the "Collect Wallet" button', () => {
    render(<Header />);
    expect(screen.getByText('Collect Wallet')).toBeInTheDocument();
  });

  it('renders the LanguageSwitcher component', () => {
    render(<Header />);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });
});
