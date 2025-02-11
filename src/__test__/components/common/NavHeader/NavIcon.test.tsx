/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react';

import NavIcon from '../../../../components/common/NavHeader/NavIcon';

describe('NavIcon Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<NavIcon isToggle={false} />);
    const navIcon = container.querySelector('#nav-icon');
    expect(navIcon).toBeInTheDocument();
  });

  it('has the class "open-nav" when isToggle is true', () => {
    const { container } = render(<NavIcon isToggle={true} />);
    const navIcon = container.querySelector('#nav-icon');
    expect(navIcon).toHaveClass('open-nav');
  });

  it('does not have the class "open-nav" when isToggle is false', () => {
    const { container } = render(<NavIcon isToggle={false} />);
    const navIcon = container.querySelector('#nav-icon');
    expect(navIcon).not.toHaveClass('open-nav');
  });

  it('renders three span elements', () => {
    const { container } = render(<NavIcon isToggle={false} />);
    const spans = container.querySelectorAll('#nav-icon span');
    expect(spans.length).toBe(3);
  });
});
