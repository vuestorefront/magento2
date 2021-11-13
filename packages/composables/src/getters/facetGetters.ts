import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet,
} from '@vue-storefront/core';

import {
  buildFacets,
  reduceForGroupedFacets,
  reduceForFacets,
} from '../composables/useFacet/_utils';

import {
  SearchData,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData: SearchData, criteria?: string[]): AgnosticFacet[] => buildFacets(searchData, reduceForFacets, criteria);

const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] => buildFacets(searchData, reduceForGroupedFacets, criteria)
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
const getProducts = (searchData): any => {
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
    itemsPerPage: searchData?.input?.itemsPerPage || 20,
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
