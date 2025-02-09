import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Button from '@/components/base/Button';
import Input from '@/components/base/Input';

import { footerConstrainLinks, footerNavLinks } from '@/lib/constants';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className=" bg-footer py-[2rem]">
      <div className="flex flex-col text-white container px-8">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <p className="typo-title-20">Navigation</p>
            <div className="grid grid-cols-3 gap-4 auto-cols-min">
              {footerNavLinks.map(({ link, text }) => (
                <Link key={text} href={link}>
                  <span className="typo-header-medium">{text}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="typo-title-20">Contact us</p>
            <div className="flex flex-col gap-4 typo-header-medium">
              <div className="flex gap-4">
                <Image src="icons/phone.svg" alt="phone icon" width={16} height={16} />
                <span>01234568910</span>
              </div>
              <div className="flex gap-4">
                <Image src="icons/message.svg" alt="message icon" width={16} height={16} />
                <span>tymex-talent@tyme.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="typo-title-20">Subscribe to receive our latest update</p>
            <div className="flex gap-4">
              <Input placeholder="Your email address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <hr className="w-full border border-l-[1px] border-gray-4 my-[3rem]"></hr>

        <div className="flex justify-between typo-header-medium">
          <p>©2023 Tyme - Edit. All Rights reserved.</p>
          <div className="flex gap-8">
            {footerConstrainLinks.map(({ link, text }) => (
              <Link key={text} href={link}>
                <span className="capitalize">{text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
