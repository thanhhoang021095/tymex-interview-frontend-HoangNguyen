import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import NavIcon from './NavHeader/NavIcon';

type FilterActionSheetProps = {
  onToggle: () => void;
  isToggle: boolean;
} & PropsWithChildren;

const FilterActionSheet: FC<FilterActionSheetProps> = ({ isToggle, onToggle, children }) => {
  return (
    <div
      role="dialog"
      className={cn(
        'fixed bottom-0 left-0 h-screen z-[90] w-full bg-black transition-all duration-300',
        isToggle ? 'fade-in-50' : 'pointer-events-none invisible opacity-0'
      )}
    >
      <button className="z-[99] mt-8 ml-8" onClick={onToggle} data-testid="toggle-button">
        <NavIcon isToggle={isToggle} />
      </button>
      <div className="md:px-12 px-6 overflow-y-auto text-center flex flex-col gap-8">
        <div className="flex gap-4 justify-center">
          <Image src="icons/filter.svg" alt="filter icon" width={16} height={16} />
          <p data-testid="filter-header" className="typo-header-medium">
            Filter
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FilterActionSheet;
