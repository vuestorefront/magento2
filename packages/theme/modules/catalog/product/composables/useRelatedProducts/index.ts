import { ref, useContext, readonly } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';
import type {
  RelatedProduct,
  UseRelatedProductsErrors,
  UseRelatedProductsInterface,
  UseRelatedProductsSearchParams,
} from './useRelatedProducts';

/**
 * Allows searching for related products
 * with params for sort, filter and pagination.
 *
 * See the {@link UseRelatedProductsInterface} for a list of methods and values available in this composable.
 */
export function useRelatedProducts(): UseRelatedProductsInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseRelatedProductsErrors>({
    search: null,
  });

  const search = async (params: UseRelatedProductsSearchParams): Promise<RelatedProduct[]> => {
    const { customQuery, ...searchParams } = params;

    let results = null;

    try {
      loading.value = true;

      Logger.debug('[Magento] Load related products based on ', { searchParams });

      const { data } = await app.$vsf.$magento.api.relatedProduct(searchParams as GetProductSearchParams, params?.customQuery ?? null);

      Logger.debug('[Result] Related products:', { data });

      results = data.products?.items[0]?.related_products;
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error('useRelatedProducts/search', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  return {
    search,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export * from './useRelatedProducts';
export default useRelatedProducts;
