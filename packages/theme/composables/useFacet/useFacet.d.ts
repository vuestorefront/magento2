import { AgnosticFacetSearchParams, ComposableFunctionArgs } from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';
import { Category, Product, Filter } from '~/composables/types';
import { ProductAttributeFilterInput, ProductAttributeSortInput } from '~/modules/GraphQL/types';

export interface FacetResultsData {
  products: Product[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}

export type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};

export interface FacetSearchResult<S> {
  data: S;
  input: AgnosticFacetSearchParams;
}

export interface UseFacetErrors {
  search: Error;
}

export type SearchData = FacetSearchResult<FacetResultsData>;

export interface UseFacet {
  result: Ref<FacetSearchResult<any>>;
  loading: Ref<boolean>;
  search: (params?: ComposableFunctionArgs<AgnosticFacetSearchParams>) => Promise<void>;
  error: Ref<UseFacetErrors>;
}
