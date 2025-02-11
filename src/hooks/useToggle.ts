'use client';
import { useState } from 'react';

export const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const setStateToggle = (val: boolean) => setToggle(val);

  return {
    toggle,
    handleToggle,
    setStateToggle
  };
};
