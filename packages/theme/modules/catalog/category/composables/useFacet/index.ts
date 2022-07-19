import { readonly, ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';
import useApi from '~/composables/useApi';
import { sortingOptions } from '~/modules/catalog/category/composables/useFacet/sortingOptions';
import { perPageOptions } from '~/modules/catalog/category/composables/useFacet/perPageOptions';
import { createProductAttributeFilterInput } from '~/modules/catalog/category/composables/useFacet/input/createProductAttributeFilterInput';
import { createProductAttributeSortInput } from '~/modules/catalog/category/composables/useFacet/input/createProductAttributeSortInput';
import { Products } from '~/modules/GraphQL/types';
import getFacetDataQuery from './getFacetData.gql';
import type {
  UseFacetInterface, UseFacetErrors, UseFacetSearchResult, FacetSearchParams,
} from './useFacet';

/**
 * Allows searching for products with pagination, totals and sorting options.
 *
 * See the {@link UseFacetInterface} for a list of methods and values available in this composable.
 */
export function useFacet(): UseFacetInterface {
  const { query } = useApi();
  const loading = ref(false);
  const result = ref<UseFacetSearchResult>({ data: null, input: null });
  const error = ref<UseFacetErrors>({
    search: null,
  });
  const defaultItemsPerPage = 20;
  const search = async (params?: FacetSearchParams) => {
    Logger.debug('useFacet/search', params);

    result.value.input = params;
    try {
      loading.value = true;

      const pageSize = params.itemsPerPage ? params.itemsPerPage : defaultItemsPerPage;

      const productSearchParams: GetProductSearchParams = {
        pageSize,
        search: params.term ? params.term : '',
        filter: createProductAttributeFilterInput(params),
        sort: createProductAttributeSortInput(params.sort || ''),
        currentPage: params.page,
      };

      const { data } = await query<{ products: Products }>(getFacetDataQuery, productSearchParams);
      const products = data?.products ?? null;
      Logger.debug('[Result]:', { products });

      result.value.data = {
        items: products?.items ?? [],
        total: products?.total_count,
        availableSortingOptions: sortingOptions,
        perPageOptions,
        itemsPerPage: pageSize,
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

export * from './useFacet';
export default useFacet;
