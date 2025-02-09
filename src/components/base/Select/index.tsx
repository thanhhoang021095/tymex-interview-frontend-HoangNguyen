import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import React from 'react';

import './select.style.css';

export type SelectProps = AntdSelectProps;

const Select: React.FC<SelectProps> = (props) => {
  return <AntdSelect {...props} />;
};

export default Select;
