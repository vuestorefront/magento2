import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  CustomQuery,
  FactoryParams,
  Logger,
  Context,
  ProductsSearchParams,
  sharedRef, UseProductFactoryParams,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseUpsellProducts, UseUpsellProductsErrors } from '../types/composables';

export interface UseUpsellProductsFactoryParams<
  PRODUCTS,
  UPSELL_PRODUCTS_SEARCH_PARAMS extends ProductsSearchParams,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  productsSearch: (context: Context, params: UPSELL_PRODUCTS_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<PRODUCTS>;
}

export function useUpsellProductsFactory<PRODUCTS, UPSELL_PRODUCTS_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseProductFactoryParams<PRODUCTS, UPSELL_PRODUCTS_SEARCH_PARAMS, API>,
) {
  return function useUpsellProducts(id: string): UseUpsellProducts<PRODUCTS, UPSELL_PRODUCTS_SEARCH_PARAMS, API> {
    const products: Ref<PRODUCTS> = sharedRef([], `useUpsellProducts-products-${id}`);
    const loading = sharedRef(false, `useUpsellProducts-loading-${id}`);
    const error: Ref<UseUpsellProductsErrors> = sharedRef({
      search: null,
    }, `useUpsellProducts-error-${id}`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(
      factoryParams,
      {
        mainRef: products, alias: 'useUpsellProducts-currentProducts', loading, error,
      },
    );

    const search = async (searchParams) => {
      Logger.debug(`useUpsellProducts/${id}/search`, searchParams);

      try {
        loading.value = true;
        products.value = await _factoryParams.productsSearch(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useUpsellProducts/${id}/search`, err);
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
