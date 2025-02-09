import Image from 'next/image';
import React from 'react';

type LanguageSwitcherProps = {};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  return (
    <div className="flex items-center gap-[1rem]">
      <Image src="icons/world.svg" alt="world icon" height={16} width={16} />
      <button className="border-none">
        <Image src="icons/chevron-down.svg" alt="chevron-down icon" height={16} width={16} />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
