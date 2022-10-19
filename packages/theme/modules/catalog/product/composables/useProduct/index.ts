import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { getProductListCommand } from '~/modules/catalog/product/composables/useProduct/commands/getProductListCommand';
import { getProductDetailsCommand } from '~/modules/catalog/product/composables/useProduct/commands/getProductDetailsCommand';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';
import type { ProductInterface } from '~/modules/GraphQL/types';
import type {
  ProductDetails,
  ProductList,
  UseProductErrors,
  UseProductInterface,
} from './useProduct';

/**
 * Allows loading product details or list with
 * params for sorting, filtering and pagination.
 *
 * See the {@link UseProductInterface} for a list of methods and values available in this composable.
 */
export function useProduct(id?: string): UseProductInterface {
  const loading = ref(false);
  const error = ref<UseProductErrors>({
    getProductList: null,
    getProductDetails: null,
  });

  const context = useContext();

  const getProductList = async (searchParams: GetProductSearchParams): Promise<ProductList | null> => {
    Logger.debug(`useProduct/${id}/getProductList`, searchParams);
    let products: ProductList = null;

    try {
      loading.value = true;
      products = await getProductListCommand.execute(context, searchParams);
      error.value.getProductList = null;
    } catch (err) {
      error.value.getProductList = err;
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
      products = await getProductDetailsCommand.execute(context, searchParams);
      error.value.getProductDetails = null;
    } catch (err) {
      error.value.getProductDetails = err;
      Logger.error(`useProduct/${id}/search`, err);
    } finally {
      loading.value = false;
    }

    return products;
  };

  const getProductPath = (product: ProductInterface) => {
    if (!product) return '/';
    return `/${product?.url_rewrites?.[0]?.url ?? product.url_key}`;
  };

  return {
    getProductList,
    getProductDetails,
    getProductPath,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export * from './useProduct';
export default useProduct;
