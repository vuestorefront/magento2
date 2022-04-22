import { ref, useContext, Ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { ComposableFunctionArgs, ProductsSearchParams, GetProductSearchParams } from '~/composables/types';
import { UseRelatedProductsError, RelatedProducts, UseRelatedProductsInterface } from '~/composables/useRelatedProducts/useRelatedProducts';

export function useRelatedProducts(): UseRelatedProductsInterface {
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseRelatedProductsError> = ref({
    search: null,
  });

  const search = async (params: ComposableFunctionArgs<ProductsSearchParams>): Promise<Array<RelatedProducts>> => {
    const { customQuery, ...searchParams } = params;

    let results = null;

    try {
      loading.value = true;

      Logger.debug('[Magento] Load related products based on ', { searchParams });

      const { data } = await app.$vsf.$magento.api.relatedProduct(searchParams as GetProductSearchParams);

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
    loading,
    error,
  };
}

export default useRelatedProducts;
