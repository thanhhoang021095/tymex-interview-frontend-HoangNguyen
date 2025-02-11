'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import Button from '@/components/base/Button';

import { headerNavLinks } from '@/lib/constants';
import { cn } from '@/lib/utils';

import LanguageSwitcher from './LanguageSwitcher';
import NavbarHeader from './NavHeader';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const pathName = usePathname();

  const renderNavLink = React.useMemo(() => {
    return (
      <ul
        className="flex items-center gap-[3rem] text-white flex-col lg:flex-row"
        role="list"
        aria-label="desktop navigation"
      >
        {headerNavLinks.map(({ slug, label }) => (
          <li
            key={slug}
            className={cn('hover:!text-purple', slug === pathName ? '!text-purple' : 'text-white')}
          >
            <Link href={slug} className="inline-block p-2 transition-colors">
              <p className="typo-title-14 relative">
                {label}
                {slug === pathName && (
                  <span className="absolute -bottom-[4px] left-0 bg-purple h-[2px] w-[1rem]"></span>
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }, [pathName]);

  return (
    <header className="bg-header fixed z-50 w-full top-0 h-[5.25rem] ">
      <div className="flex items-center justify-between px-12 h-full container">
        {/* Desktop Navigation */}
        <div className="hidden lg:block" role="navigation" aria-label="desktop navigation">
          {renderNavLink}
        </div>
        {/* Desktop Navigation */}

        {/* Mobile Navigation */}
        <div className="lg:hidden flex" role="navigation" aria-label="mobile navigation">
          <NavbarHeader>{renderNavLink}</NavbarHeader>
        </div>
        {/* Mobile Navigation */}

        {/* Wallet */}
        <div className="gap-[3rem] flex items-center">
          <Button>Collect Wallet</Button>
          <LanguageSwitcher />
        </div>
        {/* Wallet */}
      </div>
    </header>
  );
};

export default Header;
