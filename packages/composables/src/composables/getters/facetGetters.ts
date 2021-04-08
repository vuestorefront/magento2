import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet, Logger,
} from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] => {
  if (!searchData.data.availableFilters) { return []; }

  const grouped = searchData.data.availableFilters.map((item) => ({
    id: item.attribute_code,
    label: item.default_frontend_label,
    options: item.options.map((option) => ({
      type: '',
      id: option.value,
      value: option.label,
      selected: !!((searchData?.input?.filters
            && searchData?.input?.filters[item.attribute_code]
            && searchData?.input?.filters[item.attribute_code].includes(option.value))),
    })),
  }));
  return grouped;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSortOptions = (searchData): AgnosticSort => {
  if (!searchData.data) return { options: [], selected: '' } as AgnosticSort;

  return { options: searchData.data.availableSortingOptions, selected: searchData.input.sort };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategoryTree = (searchData): AgnosticCategoryTree => {
  Logger.debug(searchData);
  const buildTree = (category: any): AgnosticCategoryTree => ({
    label: category.name,
    slug: category.url_path,
    items: (category.children) ? category.children.map(buildTree) : [],
    isCurrent: false,
  });

  if (!searchData.data || !searchData.data.category.children) {
    return {} as AgnosticCategoryTree;
  }

  return buildTree(searchData.data.category);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData): any => searchData.data.items;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData): AgnosticPagination => ({
  currentPage: searchData.input.page,
  totalPages: (searchData.data) ? Math.ceil(searchData.data.total / searchData.input.itemsPerPage) : 0,
  totalItems: (searchData.data) ? searchData.data.total : 0,
  itemsPerPage: searchData.input.itemsPerPage,
  pageOptions: [10, 50, 100],
});

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
