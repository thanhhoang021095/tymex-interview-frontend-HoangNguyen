'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/base/Button';

import LanguageSwitcher from './LanguageSwitcher';

type HeaderProps = {};

const links = [
  { slug: '/', label: 'Home' },
  {
    slug: '/about',
    label: 'About us'
  },
  {
    slug: '/team',
    label: 'Our Teams'
  },
  {
    slug: '/marketplace',
    label: 'Marketplace'
  },
  {
    slug: '/roadmap',
    label: 'Roadmap'
  },
  {
    slug: '/whitepaper',
    label: 'Whitepaper'
  }
];

const Header: React.FC<HeaderProps> = () => {
  const pathName = usePathname();

  return (
    <header className="bg-header fixed z-50 w-full top-0 h-[5.25rem] ">
      <div className="flex items-center justify-between px-[1rem] h-full container">
        {/* Links */}
        <ul className="flex items-center gap-[3rem] text-white">
          {links.map(({ slug, label }) => (
            <li
              key={slug}
              className={twMerge(
                'hover:!text-purple',
                slug === pathName ? '!text-purple' : 'text-white'
              )}
            >
              <Link href={slug} className="inline-block p-2 transition-colors ">
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
        {/* Links */}

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
