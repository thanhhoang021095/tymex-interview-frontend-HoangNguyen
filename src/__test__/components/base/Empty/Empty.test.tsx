import { render, screen } from '@testing-library/react';

import Empty from '../../../../components/base/Empty';

describe('Empty Component', () => {
  it('renders with the correct text content', () => {
    render(<Empty />);
    const paragraphElement = screen.getByText('No data');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass('typo-header-semi');
    expect(paragraphElement).toHaveClass('text-center');
    expect(paragraphElement).toHaveClass('px-16');
    expect(paragraphElement).toHaveClass('py-12');
  });
});
