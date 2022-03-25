import { ref, useContext, Ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { Maybe } from '~/modules/GraphQL/types';
import { ProductsSearchParams, ComposableFunctionArgs, GetProductSearchParams } from '~/composables/types';
import { UseUpsellProductsError, UpsellProducts, UseUpsellProductsInterface } from './useUpsellProducts';

export const useUpsellProducts = (): UseUpsellProductsInterface => {
  const { app } = useContext();
  const loading = ref(false);
  const error: Ref<UseUpsellProductsError> = ref({
    search: null,
  });

  const search = async (params: ComposableFunctionArgs<ProductsSearchParams>): Promise<Maybe<Array<UpsellProducts>>> => {
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
        .upsellProduct(searchParams as GetProductSearchParams);

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
    loading,
    error,
  };
};

export default useUpsellProducts;
