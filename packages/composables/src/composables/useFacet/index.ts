import {
  Context,
  FacetSearchResult,
  ProductsSearchParams,
  useFacetFactory,
} from '@vue-storefront/core';
import { GetProductSearchParams } from '@vue-storefront/magento-api/src/types/API';

const availableSortingOptions = [
  {
    label: 'Sort: Default',
    value: '',
  },
  {
    label: 'Sort: Name A-Z',
    value: 'name_ASC',
  },
  {
    label: 'Sort: Name Z-A',
    value: 'name_DESC',
  },
  {
    label: 'Sort: Price from low to high',
    value: 'price_ASC',
  }, {
    label: 'Sort: Price from high to low',
    value: 'price_DESC',
  },
];

const constructFilterObject = (inputFilters: Object) => {
  const filter = {};

  Object.keys(inputFilters).forEach((key) => {
    if (key === 'price') {
      const price = { from: 0, to: 0 };
      const [priceFrom, priceTo] = inputFilters[key].split('-');

      price.from = priceFrom;

      if (priceTo) {
        price.to = priceTo;
      }

      filter[key] = price;
    } else if (typeof inputFilters[key] === 'string') {
      filter[key] = { finset: [inputFilters[key]] };
    } else {
      filter[key] = { finset: inputFilters[key] };
    }
  });

  return filter;
};

const constructSortObject = (sortData: string) => {
  const baseData = sortData.split(/_/ig);

  return baseData.length ? Object.fromEntries([baseData]) : {};
};

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const itemsPerPage = (params.input.itemsPerPage) ? params.input.itemsPerPage : 20;
    const inputFilters = (params.input.filters) ? params.input.filters : {};

    const productParams: ProductsSearchParams = {
      filter: {
        category_uid: {
          eq: params.input.categoryId,
        },
        ...constructFilterObject({
          ...inputFilters,
        }),
      },
      perPage: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage,
      page: params.input.page,
      search: (params.input.term) ? params.input.term : '',
      sort: constructSortObject(params.input.sort || ''),
    };

    const productSearchParams: GetProductSearchParams = {
      pageSize: productParams.perPage,
      search: productParams.search,
      filter: productParams.filter,
      sort: productParams.sort,
      currentPage: productParams.page,
    };

    const productResponse = await context.$magento.api.products(productSearchParams);

    const data = {
      items: productResponse?.data?.products?.items || [],
      total: productResponse?.data?.products?.total_count,
      availableFilters: productResponse?.data?.products?.aggregations,
      category: { id: params.input.categoryId },
      availableSortingOptions,
      perPageOptions: [10, 20, 50],
      itemsPerPage,
    };

    return data;
  },
};

export default useFacetFactory<any>(factoryParams);
