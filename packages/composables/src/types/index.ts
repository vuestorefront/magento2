// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  FacetSearchResult,
} from '@vue-storefront/core';
import {
  Category,
  Countries,
  Country,
  Product,
} from '@vue-storefront/magento-api';

export type Filter = Record<string, any>;

export interface FacetResultsData {
  products: Product[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}

export interface Breadcrumb {
  text: string;
  route: {
    path: string;
  };
}

export type SearchData = FacetSearchResult<FacetResultsData>;

export interface AddressGetter {
  countriesList(countries: Countries[]): {
    id: string;
    label: string;
    englishLabel: string;
    abbreviation: string;
  }[];

  regionList(country: Country): {
    id: number;
    label: string;
    abbreviation: string;
  }[];
}

export interface AgnosticPaymentMethod {
  label: string;
  value: string;
}

export interface AgnosticReviewMetadata {
  id: string;
  name: string;
  values: {
    label: string | number;
    id: string;
  }[];
}

export declare type FetchPolicy = 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';
