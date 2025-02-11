import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import FilterActionSheet from '../../../components/common/FilterActionSheet';

jest.mock('../../../components/common/NavHeader/NavIcon', () => ({
  __esModule: true, // Indicates it's an ES module
  default: jest.fn((props) => <div data-testid="nav-icon">{props.isToggle ? 'On' : 'Off'}</div>)
}));

describe('FilterActionSheet', () => {
  const mockOnToggle = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when `isToggle` is true', () => {
    render(
      <FilterActionSheet isToggle={true} onToggle={mockOnToggle}>
        <div data-testid="children">Test Children</div>
      </FilterActionSheet>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('filter-header')).toHaveTextContent('Filter');
    expect(screen.getByTestId('toggle-button')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toHaveTextContent('Test Children');
    expect(screen.getByRole('dialog')).toHaveClass('fade-in-50');
  });

  it('renders correctly when `isToggle` is false', () => {
    render(
      <FilterActionSheet isToggle={false} onToggle={mockOnToggle}>
        <div data-testid="children">Test Children</div>
      </FilterActionSheet>
    );

    expect(screen.getByRole('dialog')).toHaveClass('pointer-events-none invisible opacity-0');
  });

  it('calls `onToggle` when the toggle button is clicked', () => {
    render(
      <FilterActionSheet isToggle={true} onToggle={mockOnToggle}>
        <div data-testid="children">Test Children</div>
      </FilterActionSheet>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
