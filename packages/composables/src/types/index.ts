// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  FacetSearchResult,
} from '@vue-storefront/core';
import {
  Category,
  Countries,
  Country,
  Customer,
  MagentoCustomerGender,
  Product,
} from '@vue-storefront/magento-api';

export type User = Customer;

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: MagentoCustomerGender,
  taxvat?: string;
  prefix?: string
  suffix?: string
};

export type RegisterUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

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
