import { render, screen } from '@testing-library/react';

import { footerConstrainLinks, footerNavLinks } from '@/lib/constants';

import Footer from '../../components/templates/MainLayout/Footer';

// Mock dependencies
jest.mock('@/components/base/Button', () => jest.fn(({ children }) => <button>{children}</button>));
jest.mock('@/components/base/Input', () => jest.fn((props) => <input {...props} />));

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    )
  };
});

describe('Footer Component', () => {
  it('renders navigation links', () => {
    render(<Footer />);

    footerNavLinks.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders contact information', () => {
    render(<Footer />);

    // Check phone number
    expect(screen.getByText('01234568910')).toBeInTheDocument();
    // Check email address
    expect(screen.getByText('tymex-talent@tyme.com')).toBeInTheDocument();

    // Check phone icon
    expect(screen.getByAltText('phone icon')).toBeInTheDocument();
    // Check message icon
    expect(screen.getByAltText('message icon')).toBeInTheDocument();
  });

  it('renders subscription section', () => {
    render(<Footer />);

    // Check subscription text
    expect(screen.getByText('Subscribe to receive our latest update')).toBeInTheDocument();
    // Check input and button
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders footer constrain links', () => {
    render(<Footer />);

    footerConstrainLinks.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders copyright information', () => {
    render(<Footer />);

    expect(screen.getByText('©2023 Tyme - Edit. All Rights reserved.')).toBeInTheDocument();
  });

  it('renders all icons', () => {
    render(<Footer />);

    // Check if all icons are rendered
    expect(screen.getByAltText('phone icon')).toBeInTheDocument();
    expect(screen.getByAltText('message icon')).toBeInTheDocument();
  });
});
