'use client';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { QueryParamsType } from 'src/types/queryParams';

import { dropdownFilterGroups, INIT_FILTER_PARAMS } from '@/lib/constants';

import Button from '../base/Button';
import Input from '../base/Input';
import Select from '../base/Select';
import Slider from '../base/Slider';

type FilterProps = {
  filterParams: QueryParamsType;
  onChangeFilter: (option: QueryParamsType) => void;
};

const Filter: React.FC<FilterProps> = ({ onChangeFilter, filterParams }) => {
  const { search = '', priceRange: range = [0, 0] } = filterParams;
  const [priceRange, setPriceRange] = useState<number[]>(range);
  const [searchTxt, setSearchTxt] = useState<string>(search);

  const mapSelectValue = (
    label: keyof Pick<QueryParamsType, 'tier' | 'theme' | 'time' | 'priceSort'>
  ) => {
    return filterParams[label];
  };

  const onPriceChange = (newValues: number[]) => {
    setPriceRange(newValues);
  };

  const onPriceComplete = (newValues: number[]) => {
    onChangeFilter({
      priceRange: newValues as [number, number]
    });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        onChangeFilter({
          search: value
        });
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTxt(value);

    debouncedSearch(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (value: string, key: string) => {
    onChangeFilter({
      [key]: value
    });
  };

  const resetFilter = () => {
    onChangeFilter(INIT_FILTER_PARAMS);
    setSearchTxt('');
    setPriceRange([0, 1000]);
  };

  // Cleanup debounced function on component unmount
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-8">
      <Input
        onChange={onSearch}
        value={searchTxt}
        placeholder="Quick search"
        prefix={
          <Image
            src="icons/magnifying-glass.svg"
            alt="magnifying glass icon"
            width={18}
            height={18}
          />
        }
      />

      <div className="flex flex-col justify-start gap-2">
        <p className="typo-header-semi">Price</p>

        <Slider
          min={0.01}
          max={1000}
          onChange={onPriceChange}
          onChangeComplete={onPriceComplete}
          value={priceRange as [number, number]}
        />
        <div className="flex justify-between typo-header-medium text-gray-1">
          <p>0.01 ETH</p>
          <p>1000 ETH</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {dropdownFilterGroups.map(({ label, options, key }) => (
          <div key={key} className="flex flex-col gap-4">
            <p className="uppercase typo-header-semi text-gray-2">{label}</p>
            <Select
              options={options}
              defaultValue={options[0].value}
              value={mapSelectValue(
                label as keyof Pick<QueryParamsType, 'tier' | 'theme' | 'time' | 'priceSort'>
              )}
              onChange={(val: string) => onSelect(val, key)}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-12 items-center">
        <button
          className="cursor-pointer border-none flex gap-2 items-center"
          onClick={resetFilter}
        >
          <Image src="icons/solid-clear.svg" alt="clear icon" width={16} height={16} />
          Reset filter
        </button>
        <Button>Search</Button>
      </div>
    </div>
  );
};

export default Filter;
