import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Select from '../../../../components/base/Select';

describe('Select component', () => {
  it('should render without crashing', () => {
    render(<Select />); // Render the Select component
    const selectElement = screen.getByRole('combobox'); // Find the combobox (select)
    expect(selectElement).toBeInTheDocument(); // Ensure it is rendered
  });

  it('should apply passed props correctly', async () => {
    render(<Select placeholder="Select an option" />); // Pass a placeholder prop

    // Open the dropdown
    const selectElement = screen.getByRole('combobox');
    await userEvent.click(selectElement);

    // Verify the placeholder is displayed as a label in Ant Design
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('should render options when provided', async () => {
    render(
      <Select
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' }
        ]}
      />
    );

    // Open the dropdown
    const selectElement = screen.getByRole('combobox');
    await userEvent.click(selectElement);

    // Check if the correct labels are rendered in the dropdown
    expect(screen.getByText('Jack')).toBeInTheDocument(); // Check if "Jack" is rendered
    expect(screen.getByText('Lucy')).toBeInTheDocument(); // Check if "Lucy" is rendered
  });
});
