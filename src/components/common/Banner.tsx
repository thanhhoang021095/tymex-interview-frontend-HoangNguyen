import Image from 'next/image';
import React from 'react';

type BannerProps = {};

const Banner: React.FC<BannerProps> = () => {
  return (
    <section className="bg-[url(/images/intro_bg.jpg)] max-h-[50.25rem] bg-cover bg-no-repeat bg-[50%] h-full pt-[8rem] relative">
      <div className="absolute w-full h-full bg-black/70 top-0 bottom-0"></div>
      <Image
        src="images/banner.svg"
        alt="Game Banner"
        width={1920}
        height={804}
        className="h-full mx-auto z-[2] relative"
      />
    </section>
  );
};

export default Banner;
