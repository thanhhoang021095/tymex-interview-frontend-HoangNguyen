import { render, screen } from '@testing-library/react';
import { ChangeEvent } from 'react';

import Slider from '../../../../components/base/Slider';
import { SliderProps } from '../../../../components/base/Slider';

type MockSliderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip: any;
} & Omit<SliderProps, 'range' | 'onChangeComplete'>;

jest.mock('antd', () => {
  const originalModule = jest.requireActual('antd');

  return {
    ...originalModule,
    Slider: ({ min, max, value, onChange }: MockSliderProps) => {
      const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = [Number(e.target.value), value ? value[1] : max];
        if (onChange) onChange(newValue);
      };

      return (
        <div data-testid="slider">
          <input
            data-testid="slider-input"
            type="range"
            min={min}
            max={max}
            value={value ? value[0] : ''}
            onChange={handleInputChange}
          />
        </div>
      );
    }
  };
});

describe('Slider Component', () => {
  it('renders the slider with correct props', () => {
    render(<Slider min={0} max={100} defaultValue={[20, 80]} />);

    const sliderElement = screen.getByTestId('slider');
    expect(sliderElement).toBeInTheDocument();
  });
});
