'use client';
import { useFilterProduct } from '@/hooks/useFilterProduct';
import Image from 'next/image';
import React from 'react';

import Categories from './Categories';
import Collections from './Collections';
import Filter from './Filter';

type ProductsProps = {};

const Products: React.FC<ProductsProps> = () => {
  const { filter: filterParams, onChangeFilter } = useFilterProduct();

  return (
    <>
      <div className="text-white pt-[8rem] grid grid-cols-8 gap-12 px-8 container">
        <div className="col-span-2">
          <Filter onChangeFilter={onChangeFilter} filterParams={filterParams} />
        </div>
        <div className="col-span-6">
          <div className="flex flex-col gap-16">
            <Categories onChangeFilter={onChangeFilter} />
            <Collections filterParams={filterParams} onChangeFilter={onChangeFilter} />
          </div>
        </div>
      </div>

      <div className="mt-[10rem] w-full">
        <Image src="images/waver.svg" alt="waiver" height={418} width={1920} />
      </div>
    </>
  );
};

export default Products;
