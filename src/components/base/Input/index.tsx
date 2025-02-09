'use client';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
import React, { FC } from 'react';

import './input.style.css';

type InputProps = AntdInputProps & Omit<AntdInputProps, 'className'>;

const Input: FC<InputProps> = (props) => {
  return (
    <AntdInput
      placeholder="Enter your text"
      classNames={{
        input: '!border-gray-2 !typo-header-medium placeholder:!text-gray-4'
      }}
      {...props}
    />
  );
};

Input.displayName = 'Input';
export default Input;
