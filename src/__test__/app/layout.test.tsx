import { render, screen } from '@testing-library/react';

import RootLayout from '../../app/layout';

jest.mock('@/components/templates/MainLayout', () => ({
  MainLayout: jest.fn(({ children }) => <div data-testid="main-layout">{children}</div>)
}));

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ variable: '--font-inter' }))
}));

jest.mock('next/font/local', () => jest.fn(() => ({ variable: '--font-ranger' })));

describe('RootLayout Component', () => {
  it('renders the RootLayout with proper structure and children', () => {
    const childContent = 'Test Child Content';
    render(
      <RootLayout>
        <div suppressHydrationWarning>{childContent}</div>
      </RootLayout>
    );

    // Verify body classes
    expect(document.body).toHaveClass('--font-ranger');
    expect(document.body).toHaveClass('--font-inter');
    expect(document.body).toHaveClass('font-inter');

    // Verify MainLayout wraps children
    const mainLayout = screen.getByTestId('main-layout');
    expect(mainLayout).toBeInTheDocument();
    expect(mainLayout).toHaveTextContent(childContent);
  });
});
