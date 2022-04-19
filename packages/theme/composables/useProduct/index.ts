import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { getProductListCommand } from '~/composables/useProduct/commands/getProductListCommand';
import { getProductDetailsCommand } from '~/composables/useProduct/commands/getProductDetailsCommand';
import type { GetProductSearchParams } from '~/composables/types';
import type {
  ProductDetails,
  ProductList,
  UseProductErrors,
  UseProductInterface,
} from './useProduct';

export const useProduct = (id?: string): UseProductInterface => {
  const loading = ref(false);
  const error = ref<UseProductErrors>({
    search: null,
  });

  const { app } = useContext();

  const getProductList = async (searchParams: GetProductSearchParams): Promise<ProductList | null> => {
    Logger.debug(`useProduct/${id}/getProductList`, searchParams);
    let products: ProductList = null;

    try {
      loading.value = true;
      products = await getProductListCommand.execute(app, searchParams);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error(`useProduct/${id}/search`, err);
    } finally {
      loading.value = false;
    }

    return products;
  };

  const getProductDetails = async (searchParams: GetProductSearchParams): Promise<ProductDetails | null> => {
    Logger.debug(`useProduct/${id}/getProductDetails`, searchParams);
    let products: ProductDetails = null;

    try {
      loading.value = true;
      products = await getProductDetailsCommand.execute(app, searchParams);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error(`useProduct/${id}/search`, err);
    } finally {
      loading.value = false;
    }

    return products;
  };

  return {
    getProductList,
    getProductDetails,
    error: readonly(error),
    loading: readonly(loading),
  };
};

export * from './useProduct';
export default useProduct;
