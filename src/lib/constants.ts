import { QueryParamsType } from 'src/types/queryParams';

export const DEFAULT_LIMIT = 20;

export const INIT_FILTER_PARAMS: QueryParamsType = {
  search: '',
  priceRange: [0, 1000],
  tier: 'All',
  theme: 'All',
  time: 'latest',
  priceSort: 'asc',
  category: 'All'
};

export const dropdownFilterGroups = [
  {
    label: 'tier',
    key: 'tier',
    options: [
      {
        value: 'All',
        label: 'All'
      },
      {
        value: 'Basic',
        label: 'Basic'
      },
      {
        value: 'Premium',
        label: 'Premium'
      },
      {
        value: 'Deluxe',
        label: 'Deluxe'
      }
    ]
  },
  {
    label: 'theme',
    key: 'theme',
    options: [
      {
        value: 'All',
        label: 'All'
      },
      {
        value: 'Halloween',
        label: 'Halloween'
      },
      {
        value: 'Dark',
        label: 'Dark'
      },
      {
        value: 'Light',
        label: 'Light'
      },
      {
        value: 'Colorful',
        label: 'Colorful'
      }
    ]
  },
  {
    label: 'time',
    key: 'time',
    options: [
      {
        value: 'latest',
        label: 'Latest'
      },
      {
        value: 'oldest',
        label: 'Oldest'
      }
    ]
  },
  {
    label: 'price',
    key: 'priceSort',
    options: [
      {
        value: 'asc',
        label: 'Low to high'
      },
      {
        value: 'desc',
        label: 'High to low'
      }
    ]
  }
];

export const categoryList: QueryParamsType['category'][] = [
  'All',
  'Upper Body',
  'Lower Body',
  'Hat',
  'Shoes',
  'Accessory',
  'Legendary',
  'Mythic',
  'Rare',
  'Epic'
];
