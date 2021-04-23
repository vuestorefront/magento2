import {
  Context,
  FacetSearchResult,
  ProductsSearchParams,
  useFacetFactory,
} from '@vue-storefront/core';
import { GetProductSearchParams } from '@vue-storefront/magento-api/src/types/API';

const availableSortingOptions = [{
  value: 'name',
  label: 'Name',
}, {
  value: 'price-up',
  label: 'Price from low to high',
}, {
  value: 'price-down',
  label: 'Price from high to low',
}];

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

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const itemsPerPage = (params.input.itemsPerPage) ? params.input.itemsPerPage : 20;
    const inputFilters = (params.input.filters) ? params.input.filters : {};

    const productParams: ProductsSearchParams = {
      filter: {
        category_ids: {
          eq: params.input.categorySlug,
        },
        type_id: {
          eq: 'configurable',
        },
        ...constructFilterObject(inputFilters),
      },
      perPage: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage,
      page: params.input.page,
      search: (params.input.term) ? params.input.term : '',
      sort: params.input.sortFilter || {},
    };

    const productSearchParams: GetProductSearchParams = {
      pageSize: productParams.perPage,
      search: productParams.search,
      filter: productParams.filters,
      sort: productParams.sort,
      currentPage: productParams.offset,
    };

    const productResponse = await context.$magento.api.products(productSearchParams);

    const data = {
      items: productResponse?.data?.products?.items || [],
      total: productResponse?.data?.products?.total_count,
      availableFilters: productResponse?.data?.products?.aggregations,
      category: { id: params.input.categorySlug },
      availableSortingOptions,
      perPageOptions: [10, 20, 50],
      itemsPerPage,
    };

    return data;
  },
};

export default useFacetFactory<any>(factoryParams);
