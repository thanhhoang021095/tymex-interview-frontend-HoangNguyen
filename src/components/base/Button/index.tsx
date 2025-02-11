'use client';

import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import React, { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = {
  className?: string;
} & PropsWithChildren &
  Omit<AntdButtonProps, 'className'>;

const Button: FC<ButtonProps> = ({ children = null, className = '', ...props }) => {
  const baseClasses = `!rounded-[.25rem] bg-transparent shadow-none !bg-button min-h-[2.5rem] text-white border-none
  flex items-center justify-center py-[0.5rem] px-[1rem] !typo-header-semi
  hover:!bg-button-hover
  `;

  return (
    <AntdButton type="primary" {...props} className={cn(baseClasses, className)}>
      {children}
    </AntdButton>
  );
};

Button.displayName = 'Button';
export default Button;
