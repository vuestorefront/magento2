import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  CustomQuery,
  FactoryParams,
  Logger,
  Context,
  PlatformApi,
  ProductsSearchParams,
  sharedRef, UseProductFactoryParams,
} from '@absolute-web/vsf-core';
import { UseUsedProducts, UseUsedProductsErrors } from '../types/composables';

export interface UseUsedProductsFactoryParams<
  PRODUCTS,
  USED_PRODUCTS_SEARCH_PARAMS extends ProductsSearchParams,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  productsSearch: (context: Context, params: USED_PRODUCTS_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<PRODUCTS>;
}

export function useUsedProductsFactory<PRODUCTS, USED_PRODUCTS_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseProductFactoryParams<PRODUCTS, USED_PRODUCTS_SEARCH_PARAMS, API>,
) {
  return function useUsedProducts(id: string): UseUsedProducts<PRODUCTS, USED_PRODUCTS_SEARCH_PARAMS, API> {
    const products: Ref<PRODUCTS> = sharedRef([], `useUsedProducts-products-${id}`);
    const loading = sharedRef(false, `useUsedProducts-loading-${id}`);
    const error: Ref<UseUsedProductsErrors> = sharedRef({
      search: null,
    }, `useUsedProducts-error-${id}`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(
      factoryParams,
      {
        mainRef: products, alias: 'useUsedProducts-currentProducts', loading, error,
      },
    );

    const search = async (searchParams) => {
      Logger.debug(`useUsedProducts/${id}/search`, searchParams);

      try {
        loading.value = true;
        products.value = await _factoryParams.productsSearch(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useUsedProducts/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      products: computed(() => products.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
