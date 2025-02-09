import { render, screen, fireEvent } from '@testing-library/react';

import { categoryList } from '@/lib/constants';

import Categories from '../../../components/common/Categories';

describe('Categories Component', () => {
  const mockOnChangeFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list of categories as buttons', () => {
    render(<Categories onChangeFilter={mockOnChangeFilter} />);

    // Verify that the container is rendered
    const container = screen.getByTestId('categories');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex flex-nowrap gap-4');

    // Verify all category buttons are rendered
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(categoryList.length);

    buttons.forEach((button, idx) => {
      expect(button).toHaveTextContent(categoryList[idx] as string);
    });
  });

  it('calls onChangeFilter with the correct category when a button is clicked', () => {
    render(<Categories onChangeFilter={mockOnChangeFilter} />);

    const buttons = screen.getAllByRole('button');

    // Simulate clicking on each button
    buttons.forEach((button, idx) => {
      fireEvent.click(button);

      expect(mockOnChangeFilter).toHaveBeenCalledWith({
        category: categoryList[idx]
      });
    });

    // Verify that the mock function was called the correct number of times
    expect(mockOnChangeFilter).toHaveBeenCalledTimes(categoryList.length);
  });
});
