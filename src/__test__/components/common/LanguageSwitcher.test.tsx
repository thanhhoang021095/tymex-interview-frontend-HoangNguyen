import { render, screen } from '@testing-library/react';

import LanguageSwitcher from '../../../components/common/LanguageSwitcher';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

describe('LanguageSwitcher Component', () => {
  it('renders the world icon', () => {
    render(<LanguageSwitcher />);
    const worldIcon = screen.getByAltText('world icon');
    expect(worldIcon).toBeInTheDocument();
    expect(worldIcon).toHaveAttribute('src', 'icons/world.svg');
  });

  it('renders the chevron-down icon', () => {
    render(<LanguageSwitcher />);
    const chevronIcon = screen.getByAltText('chevron-down icon');
    expect(chevronIcon).toBeInTheDocument();
    expect(chevronIcon).toHaveAttribute('src', 'icons/chevron-down.svg');
  });

  it('renders the button for language selection', () => {
    render(<LanguageSwitcher />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders both icons with correct src attributes', () => {
    render(<LanguageSwitcher />);
    const worldIcon = screen.getByAltText('world icon');
    const chevronIcon = screen.getByAltText('chevron-down icon');

    expect(worldIcon).toHaveAttribute('src', 'icons/world.svg');
    expect(chevronIcon).toHaveAttribute('src', 'icons/chevron-down.svg');
  });
});
