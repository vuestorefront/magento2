import type { Ref } from '@nuxtjs/composition-api';
import { ref, readonly, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type {
  UseUpsellProductsError,
  UseUpsellProductsInterface,
  UseUpsellProductsSearchParams,
} from './useUpsellProducts';

/**
 * Allows loading upsell products.
 *
 * See the {@link UseUpsellProductsInterface} for a list of methods and values available in this composable.
 */
export function useUpsellProducts(): UseUpsellProductsInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error: Ref<UseUpsellProductsError> = ref({
    search: null,
  });

  const search = async (params: UseUpsellProductsSearchParams) => {
    const {
      customQuery,
      ...searchParams
    } = params;

    let results = null;

    try {
      loading.value = true;

      Logger.debug('[Magento] Load upsell products based on ', { searchParams });

      const { data } = await app
        .$vsf
        .$magento
        .api
        .upsellProduct(searchParams, params?.customQuery ?? null);

      Logger.debug('[Result] Upsell products:', { data });

      results = data.products?.items[0]?.upsell_products;
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error('useUpsellProducts/search', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  return {
    search,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export default useUpsellProducts;
export * from './useUpsellProducts';
