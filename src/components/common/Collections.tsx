/* eslint-disable import-helpers/order-imports */
'use client';

import React from 'react';
import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '@/lib/constants';

import useFetchData from '../../hooks/useFetchData';
import Button from '../base/Button';
import Card from '../base/Card';

import './common.style.css';
import { IProduct } from 'src/types/model';

type CollectionsProps = {
  filterParams: QueryParamsType;
  onChangeFilter: (option: QueryParamsType) => void;
};

const Collections: React.FC<CollectionsProps> = ({ filterParams, onChangeFilter }) => {
  const { data, error, isLoading, fetchData } = useFetchData(filterParams);

  const onViewMore = async () => {
    const limit = (data.length || 0) + DEFAULT_LIMIT;

    await fetchData({
      limit,
      ...filterParams
    });

    onChangeFilter({
      limit
    });
  };

  const content = React.useMemo(() => {
    if (error) return <div className="min-h-[112.5rem]">Error</div>;

    return (
      <>
        <div className="grid xl:grid-cols-4 grid-cols2 md:grid-cols-2 gap-4 pr-2 overflow-x-hidden max-h-[112.5rem] overflow-y-auto custom-sidebar">
          {data.map((item: IProduct, idx) => (
            <Card key={`${item.id}_${idx}`} cardIndex={item.id} {...item} loading={isLoading} />
          ))}
        </div>
        <div className="mt-10 w-full flex justify-center">
          <Button onClick={onViewMore} loading={isLoading} disabled={isLoading}>
            View more
          </Button>
        </div>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isLoading]);

  return <div className="w-full">{content}</div>;
};

export default Collections;
