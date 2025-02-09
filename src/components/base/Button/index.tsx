'use client';
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import React, { FC, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren & AntdButtonProps;

const Button: FC<ButtonProps> = ({ children = null, ...props }) => {
  const baseClasses = `!rounded-[.25rem] !bg-button min-h-[2.5rem] shadow-button text-white border-none
  flex items-center justify-center py-[0.5rem] px-[1rem] !typo-header-semi
  hover:!bg-button-hover
  `;

  return (
    <AntdButton type="primary" {...props} className={baseClasses}>
      {children}
    </AntdButton>
  );
};

Button.displayName = 'Button';
export default Button;
