'use client';

import React from 'react';
import { IProduct } from 'server/model';
import { QueryParamsType } from 'src/types/queryParams';

import { DEFAULT_LIMIT } from '@/lib/constants';

import useFetchData from '../../hooks/useFetchData';
import Button from '../base/Button';
import Card from '../base/Card';

type CollectionsProps = {
  filterParams: QueryParamsType;
  onChangeFilter: (option: QueryParamsType) => void;
};

const Collections: React.FC<CollectionsProps> = ({ filterParams, onChangeFilter }) => {
  const { data, error, isLoading, fetchData } = useFetchData<IProduct[]>(filterParams);

  const onViewMore = () => {
    const limit = (data?.length || 0) + DEFAULT_LIMIT;

    fetchData({
      limit,
      ...filterParams
    });

    onChangeFilter({
      limit
    });
  };

  const content = React.useMemo(() => {
    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;

    return (
      <>
        <div className="grid grid-cols-4 gap-4 overflow-x-hidden max-h-[112.5rem] overflow-y-auto">
          {data?.map((item: IProduct) => <Card key={item.id} {...item} />)}
        </div>
        <div className="mt-10 w-full flex justify-center">
          <Button onClick={onViewMore}>View more</Button>
        </div>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isLoading]);

  return <div className="w-full">{content}</div>;
};

export default Collections;
