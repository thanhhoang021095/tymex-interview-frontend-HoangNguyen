/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useToggle } from '@/hooks/useToggle';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import { ChangeEvent, FC, useCallback, useMemo, useState, useEffect } from 'react';
import { QueryParamsType } from 'src/types/queryParams';

import { dropdownFilterGroups, INIT_FILTER_PARAMS } from '@/lib/constants';

import Button from '../base/Button';
import Input from '../base/Input';
import Select from '../base/Select';
import Slider from '../base/Slider';
import FilterActionSheet from './FilterActionSheet';

type FilterProps = {
  filterParams: QueryParamsType;
  onChangeFilter: (option: QueryParamsType) => void;
};

const Filter: FC<FilterProps> = ({ onChangeFilter, filterParams }) => {
  const { search = '', priceRange: range = [0, 0] } = filterParams;
  const [priceRange, setPriceRange] = useState<number[]>(range);
  const [searchTxt, setSearchTxt] = useState<string>(search);
  const { toggle, handleToggle, setStateToggle } = useToggle();

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
    []
  );

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTxt(value);

    debouncedSearch(value);
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
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const filterGroupContent = useMemo(() => {
    return (
      <>
        <div className="flex flex-col gap-8">
          {dropdownFilterGroups.map(({ label, options, key }) => (
            <div key={key} className="flex items-center lg:items-start flex-row lg:flex-col gap-4">
              <p className="uppercase typo-header-semi text-gray-2 w-[5rem] shrink-0">{label}</p>
              <Select
                options={options}
                defaultValue={options[0].value}
                value={mapSelectValue(
                  label as keyof Pick<QueryParamsType, 'tier' | 'theme' | 'time' | 'priceSort'>
                )}
                onChange={(val: string) => onSelect(val, key)}
                data-testid={`dropdown-select-${key}`}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-12 items-center lg:justify-start justify-center mt-6">
          <button
            className="cursor-pointer border-none flex gap-2 items-center"
            onClick={resetFilter}
            data-testid="reset-button"
          >
            <Image src="icons/solid-clear.svg" alt="clear icon" width={16} height={16} />
            Reset filter
          </button>
          <Button onClick={() => setStateToggle(false)}>Search</Button>
        </div>
      </>
    );
  }, [mapSelectValue, onSelect, resetFilter]);

  return (
    <div className="flex flex-col lg:gap-8 gap-12">
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

      <div className="flex flex-row lg:items-start items-center lg:flex-col justify-start lg:gap-2 gap-6 lg:mt-0 mt-6">
        <p className="typo-header-semi">Price</p>
        <div className="flex flex-col w-full">
          <Slider
            min={0.01}
            max={1000}
            onChange={onPriceChange}
            onChangeComplete={onPriceComplete}
            value={priceRange as [number, number]}
            aria-label="price-slider"
            data-testid="price-slider"
          />
          <div className="flex justify-between typo-header-medium text-gray-1">
            <p>0.01 ETH</p>
            <p>1000 ETH</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">{filterGroupContent}</div>

      <div className="lg:hidden block">
        <button
          className="w-full lg:hidden text-white border border-white bg-transparent hover:bg-button hover:border-transparent flex-center gap-4 rounded-[0.25rem] h-[2.5rem]"
          onClick={handleToggle}
        >
          <Image src="icons/filter.svg" alt="filter icon" width={16} height={16} />
          <p className="typo-header-semi">Filter</p>
        </button>

        <FilterActionSheet onToggle={handleToggle} isToggle={toggle}>
          {filterGroupContent}
        </FilterActionSheet>
      </div>
    </div>
  );
};

export default Filter;
