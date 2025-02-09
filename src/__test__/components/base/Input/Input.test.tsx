import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Input from '../../../../components/base/Input/index';

describe('Input Component', () => {
  it('should render with the default placeholder', () => {
    render(<Input />);
    const inputElement = screen.getByPlaceholderText('Enter your text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('!border-gray-2 !typo-header-medium placeholder:!text-gray-4');
  });

  it('should accept and render a custom placeholder', () => {
    render(<Input placeholder="Custom Placeholder" />);
    const inputElement = screen.getByPlaceholderText('Custom Placeholder');
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onChange when the input value changes', async () => {
    const onChangeMock = jest.fn();
    render(<Input onChange={onChangeMock} />);
    const inputElement = screen.getByPlaceholderText('Enter your text');

    await userEvent.type(inputElement, 'Hello');
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledTimes(5); // Called for each character typed
  });

  it('should accept a default value', () => {
    render(<Input defaultValue="Default Value" />);
    const inputElement = screen.getByDisplayValue('Default Value');
    expect(inputElement).toBeInTheDocument();
  });

  it('should handle additional props like disabled', () => {
    render(<Input disabled />);
    const inputElement = screen.getByPlaceholderText('Enter your text');
    expect(inputElement).toBeDisabled();
  });
});
