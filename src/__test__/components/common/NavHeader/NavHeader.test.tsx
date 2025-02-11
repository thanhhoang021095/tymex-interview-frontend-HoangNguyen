/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NavHeader from '../../../../components/common/NavHeader/index';
import { useToggle } from '../../../../hooks/useToggle';

jest.mock('../../../../hooks/useToggle');

describe('NavHeader Component', () => {
  const mockUseToggle = (
    toggleState = false,
    handleToggleFn = jest.fn(),
    setStateToggleFn = jest.fn()
  ) => {
    (useToggle as jest.Mock).mockReturnValue({
      toggle: toggleState,
      handleToggle: handleToggleFn,
      setStateToggle: setStateToggleFn
    });
  };

  it('renders without crashing', () => {
    mockUseToggle();
    const { container } = render(<NavHeader>Test Content</NavHeader>);
    expect(container).toBeInTheDocument();
  });

  it('calls handleToggle when button is clicked', () => {
    const handleToggleMock = jest.fn();
    mockUseToggle(false, handleToggleMock);

    const { getByRole } = render(<NavHeader>Test Content</NavHeader>);
    const button = getByRole('button');
    fireEvent.click(button);

    expect(handleToggleMock).toHaveBeenCalled();
  });

  it('adds and removes resize event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    mockUseToggle();
    const { unmount } = render(<NavHeader>Test Content</NavHeader>);

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('applies the correct class when toggle is true', () => {
    mockUseToggle(true);

    const { container } = render(<NavHeader>Test Content</NavHeader>);
    const div = container.querySelector('div');

    expect(div).toHaveClass('open-nav');
  });
});
