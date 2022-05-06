import type {
  AgnosticPagination,
  AgnosticSort,
} from '~/composables/types';

import { ProductInterface } from '~/modules/GraphQL/types';
import { FacetSearchParams } from '~/modules/catalog/category/composables/useFacet';
import { PerPageOptions } from '~/modules/catalog/category/composables/useFacet/PerPageOptions';

export interface FacetSearchResult<S> {
  data: S;
  input: FacetSearchParams;
}

export interface FacetsGetters<SEARCH_DATA, RESULTS = any> {
  getSortOptions: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticSort;
  getProducts: (searchData: FacetSearchResult<SEARCH_DATA>) => RESULTS;
  getPagination: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticPagination;
  [getterName: string]: (element: any, options?: any) => unknown;
}

const getSortOptions = (searchData): AgnosticSort => {
  if (!searchData || !searchData.data || !searchData.data.availableSortingOptions) {
    return {
      options: [],
      selected: '',
    } as AgnosticSort;
  }

  return {
    options: searchData.data.availableSortingOptions,
    selected: searchData.input.sort,
  };
};

const getProducts = (searchData): ProductInterface[] => {
  if (!searchData || !searchData.data || !searchData.data.items) {
    return [];
  }
  return searchData.data.items;
};

const getPagination = (searchData): AgnosticPagination => {
  const totalPages = (searchData?.data) ? (
    Number.isNaN(Math.ceil(searchData.data.total / searchData.input.itemsPerPage))
      ? 1
      : Math.ceil(searchData.data.total / searchData.input.itemsPerPage)
  ) : 1;

  return {
    currentPage: (searchData?.input?.page > totalPages ? 1 : searchData?.input?.page) || 1,
    totalPages,
    totalItems: (searchData?.data?.total) ? searchData.data.total : 0,
    itemsPerPage: searchData?.input?.itemsPerPage || 10,
    pageOptions: PerPageOptions,
  };
};

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getProducts,
  getPagination,
};

export default facetGetters;
