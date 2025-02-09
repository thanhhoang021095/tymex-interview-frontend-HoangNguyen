/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Button from '../../../../components/base/Button/index';

describe('Button Component', () => {
  it('should render with default props', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveClass(
      '!rounded-[.25rem] !bg-button min-h-[2.5rem] shadow-button text-white border-none flex items-center justify-center py-[0.5rem] px-[1rem] !typo-header-semi hover:!bg-button-hover'
    );
  });

  it('should render children properly', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    const button = getByText('Test Button');
    expect(button).toBeInTheDocument();
  });

  it('should accept and apply additional props', async () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <Button onClick={onClickMock} disabled>
        Disabled Button
      </Button>
    );

    const button = getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should handle Ant Design props', () => {
    const { getByRole } = render(<Button danger>Danger Button</Button>);

    const button = getByRole('button');
    expect(button).toHaveClass('ant-btn-dangerous');
  });

  it('should call onClick when clicked', async () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(<Button onClick={onClickMock}>Click Me</Button>);

    const button = getByRole('button');
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
