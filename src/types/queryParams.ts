import { IProduct } from './model';

export interface QueryParamsType {
  limit?: number;
  // filtered by sidebar
  search?: string;
  priceRange?: [number, number];
  tier?: IProduct['tier'] | 'All';
  theme?: IProduct['category'] | 'All';
  time?: 'oldest' | 'latest';
  priceSort?: 'asc' | 'desc';

  // filtered by categories
  category?: IProduct['category'] | 'All';
}
