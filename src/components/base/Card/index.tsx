/* eslint-disable import-helpers/order-imports */
import { Card as AntdCard } from 'antd';
import Image from 'next/image';
import React, { FC } from 'react';

import './card.style.css';
import { mapAuthorStatus, randomCardStyle } from './helper';
import { IProduct } from 'src/types/model';

const CardContent: FC<IProduct> = ({ title, author, price, isFavorite, category }) => {
  const { characterImg, background: characterBg } = randomCardStyle();

  return (
    <div className="flex flex-col overflow-hidden text-white">
      <div
        className="relative w-full h-full rounded-[.25rem]"
        style={{
          background: characterBg
        }}
      >
        <Image src={characterImg} alt="card image" width={400} height={400} />
        <div className="absolute top-0 left-0 h-full bg-transparent z-[2] w-full">
          <div className="p-[0.625rem] flex justify-between">
            <span className="flex-center h-[1.75rem] rounded-[.25rem] bg-gray-3 text-white px-[0.8rem] typo-caption-medium">
              {category}
            </span>

            {isFavorite && <Image src="icons/heart.svg" alt="heart icon" width={16} height={16} />}
          </div>
        </div>
      </div>
      <div className="flex gap-[1rem] flex-col mt-[1.5rem]">
        <div className="flex justify-between">
          <p className="typo-header-semi line-clamp-1">{title}</p>
          <div className="flex gap-1 items-center shrink-0">
            <Image src="icons/eth-coin.svg" alt="eth coin" width={8} height={14} />
            <p className="typo-body-medium whitespace-nowrap shrink-0">{price} ETH</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="w-[2.125rem] h-[2.125rem] relative">
            <div className="rounded-full w-[2rem] h-[2rem] bg-white relative overflow-hidden z-[1]">
              <div className="h-[2rem] w-[2rem] relative">
                <Image
                  src={author.avatar}
                  alt="author avatar"
                  fill
                  className="absolute top-0 left-0"
                />
              </div>
            </div>
            <div className="bg-footer w-[0.75rem] h-[0.75rem] rounded-full absolute right-0 bottom-0 z-[2]">
              <span className="flex-center h-full w-full">
                <Image
                  src={mapAuthorStatus(author.onlineStatus)}
                  alt="author status"
                  width={8}
                  height={8}
                />
              </span>
            </div>
          </div>
          <p className="typo-caption-medium">
            {author.firstName} {author.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

type CardProps = IProduct;

const Card: FC<CardProps> = (props) => {
  return (
    <AntdCard className="card lg:h-[22.8125rem] !h-auto">
      <CardContent {...props} />
    </AntdCard>
  );
};

export default Card;
