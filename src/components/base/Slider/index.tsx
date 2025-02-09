'use client';
import { Slider as AntdSlider } from 'antd';
import React from 'react';

import './slider.style.css';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  value?: [number, number];
  onChangeComplete?: (value: number[]) => void;
  onChange?: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  defaultValue,
  value,
  onChange,
  onChangeComplete
}) => {
  return (
    <AntdSlider
      range
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onChangeComplete={onChangeComplete}
      onChange={onChange}
      classNames={{
        handle: 'dot-slider',
        tracks: 'slider-tracks',
        track: 'slider-track',
        rail: 'slider-rail'
      }}
      tooltip={{
        open: true,
        autoAdjustOverflow: false,
        placement: 'top',
        formatter: (value) => {
          return <p className="typo-header-semi">{`${value} ETH`}</p>;
        }
      }}
      styles={{
        track: {
          background:
            'linear-gradient(91.27deg, rgba(218, 69, 143, 0) 0.55%, rgb(218, 65, 162) 24.03%, rgb(218, 55, 206) 83.19%, rgba(218, 52, 221, 0) 102.8%)'
        },
        rail: {
          background: 'var(--gray-3)'
        }
      }}
    />
  );
};

export default Slider;
