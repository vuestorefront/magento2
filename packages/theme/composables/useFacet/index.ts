import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { AgnosticFacetSearchParams, ComposableFunctionArgs } from '~/composables/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';
import type { UseFacetInterface, UseFacetErrors, UseFacetSearchResult } from './useFacet';

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
  },
  {
    label: 'Sort: Price from high to low',
    value: 'price_DESC',
  },
];

function constructFilterObject(inputFilters: Object) {
  const filter = {};

  Object.keys(inputFilters).forEach((key) => {
    if (key === 'price') {
      const price = { from: 0, to: 0 };
      const flatPrices = inputFilters[key]
        .flatMap((inputFilter) => inputFilter.split('_'))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .map((str) => Number.parseFloat(str))
        .sort((a, b) => a - b);

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
}

function constructSortObject(sortData: string) {
  const baseData = sortData.split(/_/gi);

  return baseData.length > 0 ? Object.fromEntries([baseData]) : {};
}

/**
 * The `useFacet()` composable allows searching for products using facets.
 *
 * What makes it powerful is the ability to accept multiple filters, allowing to
 * narrow down the results to a specific category, search term, etc.
 */
export function useFacet(): UseFacetInterface {
  const { app } = useContext();
  const loading = ref(false);
  const result = ref<UseFacetSearchResult<any>>({ data: null, input: null });
  const error = ref<UseFacetErrors>({
    search: null,
  });

  const search = async (params?: ComposableFunctionArgs<AgnosticFacetSearchParams>) => {
    Logger.debug('useFacet/search', params);

    result.value.input = params;
    try {
      loading.value = true;

      const itemsPerPage = params.itemsPerPage ? params.itemsPerPage : 20;
      const inputFilters = params.filters ? params.filters : {};

      const categoryId = params.categoryId && !inputFilters.category_id
        ? {
          category_uid: {
            ...(Array.isArray(params.categoryId)
              ? { in: params.categoryId }
              : { eq: params.categoryId }),
          },
        }
        : {};

      const productSearchParams: GetProductSearchParams = {
        pageSize: itemsPerPage,
        search: params.term ? params.term : '',
        filter: {
          ...categoryId,
          ...constructFilterObject({
            ...inputFilters,
          }),
        },
        sort: constructSortObject(params.sort || ''),
        currentPage: params.page,
      };

      const { data } = await app.context.$vsf.$magento.api.products(productSearchParams, params?.customQuery || { products: 'products' });

      Logger.debug('[Result]:', { data });

      result.value.data = {
        items: data?.products?.items ?? [],
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
    search,
    result,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export type { SearchData } from './SearchData';
export * from './useFacet';
export default useFacet;
