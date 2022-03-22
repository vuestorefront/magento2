import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import {
  AgnosticFacetSearchParams, ComposableFunctionArgs, Logger, ProductsSearchParams,
} from '@vue-storefront/core';
import {
  FacetSearchResult, UseFacet, UseFacetErrors, GetProductSearchParams,
} from './useFacet';

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const flatPrices = inputFilters[key].flatMap((inputFilter) => inputFilter.split('_').map((str) => Number.parseFloat(str))).sort((a, b) => a - b);

      [price.from] = flatPrices;
      price.to = flatPrices[flatPrices.length - 1];

      filter[key] = price;
    } else if (typeof inputFilters[key] === 'string') {
      filter[key] = { in: [inputFilters[key]] };
    } else {
      filter[key] = { in: inputFilters[key] };
    }
  });

  return filter;
};

const constructSortObject = (sortData: string) => {
  const baseData = sortData.split(/_/gi);

  return baseData.length > 0 ? Object.fromEntries([baseData]) : {};
};

export const useFacet = (): UseFacet => {
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const result: Ref<FacetSearchResult<any>> = ref({ data: null, input: null });
  const error: Ref<UseFacetErrors> = ref({
    search: null,
  });

  const search = async (params?: ComposableFunctionArgs<AgnosticFacetSearchParams>) => {
    Logger.debug('useFacet/search', params);

    result.value.input = params;
    try {
      loading.value = true;

      const itemsPerPage = (params.itemsPerPage) ? params.itemsPerPage : 20;
      const inputFilters = (params.filters) ? params.filters : {};
      const categoryId = (params.categoryId) ? {
        category_uid: {
          ...(Array.isArray(params.categoryId)
            ? { in: params.categoryId }
            : { eq: params.categoryId }),
        },
      } : {};

      const productParams: ProductsSearchParams = {
        filter: {
          ...categoryId,
          ...constructFilterObject({
            ...inputFilters,
          }),
        },
        perPage: itemsPerPage,
        offset: (params.page - 1) * itemsPerPage,
        page: params.page,
        search: (params.term) ? params.term : '',
        sort: constructSortObject(params.sort || ''),
      };

      const productSearchParams: GetProductSearchParams = {
        pageSize: productParams.perPage,
        search: productParams.search,
        filter: productParams.filter,
        sort: productParams.sort,
        currentPage: productParams.page,
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const { data } = await app.context.$vsf.$magento.api.products(productSearchParams, params?.customQuery || { products: 'products' });

      Logger.debug('[Result]:', { data });

      result.value.data = {
        items: data?.products?.items || [],
        total: data?.products?.total_count,
        availableFilters: data?.products?.aggregations,
        category: { id: params.categoryId },
        availableSortingOptions,
        perPageOptions: [10, 20, 50],
        itemsPerPage,
      };
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error('useFacet/search', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    result,
    loading,
    error,
    search,
  };
};

export default useFacet;
