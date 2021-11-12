import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams, Context,
  CustomQuery,
  FactoryParams,
  Logger,
  ProductsSearchParams,
  sharedRef,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseRelatedProducts, UseRelatedProductsErrors } from '../types/composables';

export interface UseRelatedProductsFactoryParams<
  PRODUCTS,
  RELATED_PRODUCTS_SEARCH_PARAMS extends ProductsSearchParams,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  productsSearch: (context: Context, params: RELATED_PRODUCTS_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<PRODUCTS>;
}

export function useRelatedProductsFactory<PRODUCTS, RELATED_PRODUCTS_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseRelatedProductsFactoryParams<PRODUCTS, RELATED_PRODUCTS_SEARCH_PARAMS, API>,
) {
  return function useRelatedProduct(id: string): UseRelatedProducts<PRODUCTS, RELATED_PRODUCTS_SEARCH_PARAMS, API> {
    const products: Ref<PRODUCTS> = sharedRef([], `useRelatedProducts-products-${id}`);
    const loading = sharedRef(false, `useRelatedProducts-loading-${id}`);
    const error: Ref<UseRelatedProductsErrors> = sharedRef({
      search: null,
    }, `useRelatedProducts-error-${id}`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(
      factoryParams,
      {
        mainRef: products, alias: 'relatedProducts-currentProduct', loading, error,
      },
    );

    const search = async (searchParams) => {
      Logger.debug(`useRelatedProducts/${id}/search`, searchParams);

      try {
        loading.value = true;
        products.value = await _factoryParams.productsSearch(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useRelatedProducts/${id}/search`, err);
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
