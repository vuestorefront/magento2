import {
  AgnosticCategoryTree,
  GroupedFacetInterface,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  FacetInterface,
} from '~/composables/types';

import { FacetsGetters } from '~/getters/types';
import type { SearchData } from '~/composables/useFacet';

import {
  buildFacets,
  reduceForGroupedFacets,
  reduceForFacets,
} from '~/composables/useFacet/_utils';
import { ProductInterface } from '~/modules/GraphQL/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData: SearchData, criteria?: string[]): FacetInterface[] => buildFacets(searchData, reduceForFacets, criteria);

const getGrouped = (searchData: SearchData, criteria?: string[]): GroupedFacetInterface[] => buildFacets(searchData, reduceForGroupedFacets, criteria)
  ?.filter((facet) => facet.options && facet.options.length > 0);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategoryTree = (searchData): AgnosticCategoryTree => {
  const buildTree = (category: any): AgnosticCategoryTree => ({
    label: category.name,
    slug: category.url_path,
    items: (category.children) ? category.children.map((element) => buildTree(element)) : [],
    isCurrent: (category.name === searchData.data.category.name),
  });

  if (!searchData.data || !searchData.data.category.children) {
    return {} as AgnosticCategoryTree;
  }

  return buildTree(searchData.data.category);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData): ProductInterface[] => {
  if (!searchData || !searchData.data || !searchData.data.items) {
    return [];
  }
  return searchData.data.items;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    pageOptions: [10, 50, 100],
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBreadcrumbs = (searchData): AgnosticBreadcrumb[] => [];

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination,
};

export default facetGetters;
