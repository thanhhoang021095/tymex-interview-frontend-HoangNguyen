import React from 'react';
import { QueryParamsType } from 'src/types/queryParams';

import { categoryList } from '@/lib/constants';

import Button from '../base/Button';

import './common.style.css';

type CategoriesProps = {
  onChangeFilter: (option: QueryParamsType) => void;
};

const Categories: React.FC<CategoriesProps> = ({ onChangeFilter }) => {
  const onChange = (selectedCate: QueryParamsType['category']) => {
    onChangeFilter({
      category: selectedCate
    });
  };

  return (
    <div
      className="flex flex-nowrap gap-4 overflow-x-auto overflow-y-hidden custom-sidebar custom-sidebar-horizontal pb-2"
      data-testid="categories"
    >
      {categoryList.map((cate, idx) => (
        <Button onClick={() => onChange(cate)} key={idx}>
          {cate}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
