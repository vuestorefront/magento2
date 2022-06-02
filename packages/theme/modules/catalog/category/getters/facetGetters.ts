import { perPageOptions } from '~/modules/catalog/category/composables/useFacet/perPageOptions';
import type { ProductInterface } from '~/modules/GraphQL/types';
import type { Pagination } from '~/composables/types';
import type { SortingModel } from '~/modules/catalog/category/composables/useFacet/sortingOptions';
import type { UseFacetSearchResult } from '~/modules/catalog/category/composables/useFacet/useFacet';

export interface FacetsGetters {
  getSortOptions: (searchData: UseFacetSearchResult) => SortingModel;
  getProducts: (searchData: UseFacetSearchResult) => ProductInterface[];
  getPagination: (searchData: UseFacetSearchResult) => Pagination;
}

const facetGetters: FacetsGetters = {
  getSortOptions(searchData) {
    if (!searchData || !searchData.data || !searchData.data.availableSortingOptions) {
      return {
        options: [],
        selected: '',
      } as SortingModel;
    }

    return {
      options: searchData.data.availableSortingOptions,
      selected: searchData.input.sort,
    };
  },
  getProducts(searchData) {
    if (!searchData || !searchData.data || !searchData.data.items) {
      return [];
    }
    return searchData.data.items;
  },
  getPagination(searchData) {
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
      pageOptions: perPageOptions,
    };
  },
};

export default facetGetters;
