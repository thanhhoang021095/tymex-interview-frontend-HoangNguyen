import { render, screen } from '@testing-library/react';

import Banner from '../../../components/common/Banner';

describe('Banner Component', () => {
  it('should render the Banner with the correct background and image', () => {
    render(<Banner />);

    // Check for the section element with the data-testid
    const section = screen.getByTestId('banner-section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass(
      'bg-[url(/images/intro_bg.jpg)] max-h-[50.25rem] bg-cover bg-no-repeat bg-[50%] h-full pt-[8rem] relative'
    );

    // Check for the overlay div
    // eslint-disable-next-line testing-library/no-node-access
    const overlay = section.querySelector('div');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('absolute w-full h-full bg-black/70 top-0 bottom-0');

    // Check for the image with the correct attributes
    const image = screen.getByAltText('Game Banner');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'images/banner.svg');
    expect(image).toHaveClass('h-full mx-auto z-[2] relative');
  });
});
