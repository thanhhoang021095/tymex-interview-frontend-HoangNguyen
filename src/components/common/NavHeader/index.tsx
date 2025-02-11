import { useToggle } from '@/hooks/useToggle';
import React from 'react';

import { cn } from '@/lib/utils/cn';

import NavIcon from './NavIcon';

interface NavHeaderProps extends React.PropsWithChildren {}

const thresholdWidth = 768;

const NavHeader: React.FC<NavHeaderProps> = ({ children }) => {
  const { toggle, handleToggle, setStateToggle } = useToggle();

  React.useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= thresholdWidth) {
        setStateToggle(false);
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button onClick={handleToggle} className="z-[99]">
        <NavIcon isToggle={toggle} />
      </button>
      {
        <div
          className={cn(
            'fixed top-0 left-0 z-[95] h-screen w-full transition-all duration-300 bg-black overflow-hidden pt-8',
            toggle ? 'fade-in-50 slide-in-from-top-2' : 'pointer-events-none invisible opacity-0'
          )}
        >
          {children}
        </div>
      }
    </>
  );
};

export default NavHeader;
