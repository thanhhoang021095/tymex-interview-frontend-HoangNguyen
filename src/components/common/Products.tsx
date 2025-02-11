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
      <div className="text-white pt-16 lg:pt-[8rem] grid xl:grid-cols-8 lg:grid-cols-6 grid-cols-1 gap-y-12 md:gap-x-12 md:px-12 px-6 container">
        <div className="col-span-2">
          <Filter onChangeFilter={onChangeFilter} filterParams={filterParams} />
        </div>
        <div className="xl:col-span-6 lg:col-span-4 col-span-1">
          <div className="flex flex-col gap-16">
            <Categories onChangeFilter={onChangeFilter} selectedCategory={filterParams.category} />
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
