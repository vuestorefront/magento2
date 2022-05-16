import { readonly, ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';
import useApi from '~/composables/useApi';
import { SortingOptions } from '~/modules/catalog/category/composables/useFacet/SortingOptions';
import { PerPageOptions } from '~/modules/catalog/category/composables/useFacet/PerPageOptions';
import { createProductAttributeFilterInput } from '~/modules/catalog/category/composables/useFacet/input/createProductAttributeFilterInput';
import { createProductAttributeSortInput } from '~/modules/catalog/category/composables/useFacet/input/createProductAttributeSortInput';
import { Products } from '~/modules/GraphQL/types';
import GetFacetDataQuery from './getFacetData.gql';
import type {
  UseFacetInterface, UseFacetErrors, UseFacetSearchResult, FacetSearchParams,
} from './useFacet';

/**
 * The `useFacet()` composable allows searching for products using facets.
 *
 * What makes it powerful is the ability to accept multiple filters, allowing to
 * narrow down the results to a specific category, search term, etc.
 */
export function useFacet(): UseFacetInterface {
  const { query } = useApi();
  const loading = ref(false);
  const result = ref<UseFacetSearchResult>({ data: null, input: null });
  const error = ref<UseFacetErrors>({
    search: null,
  });
  const defaultItemsPerPage = 20;
  const search = async (params?: ComposableFunctionArgs<FacetSearchParams>) => {
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

      const { products } = await query<{ products: Products }>(GetFacetDataQuery, productSearchParams);

      Logger.debug('[Result]:', { products });

      result.value.data = {
        items: products?.items ?? [],
        total: products?.total_count,
        availableSortingOptions: SortingOptions,
        perPageOptions: PerPageOptions,
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
