import { Ref, computed } from '@vue/composition-api';
import {
  CustomQuery, UseUserOrder, Context, FactoryParams, UseUserOrderErrors, PlatformApi, sharedRef, Logger, configureFactoryParams,
} from '@absolute-web/vsf-core';

export interface UseUserOrderFactoryParams<
  ORDERS,
  ORDER_SEARCH_PARAMS,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<ORDERS>;
}

export function useUserOrderFactory<
  ORDERS,
  ORDER_SEARCH_PARAMS,
  API extends PlatformApi = any,
>(factoryParams: UseUserOrderFactoryParams<ORDERS, ORDER_SEARCH_PARAMS, API>) {
  return function useUserOrder(ssrKey = 'useUserOrders'): UseUserOrder<ORDERS, ORDER_SEARCH_PARAMS, API> {
    const orders: Ref<ORDERS> = sharedRef(null, `${ssrKey}-orders`);
    const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
    const error: Ref<UseUserOrderErrors> = sharedRef({
      search: null,
    }, `${ssrKey}-error`);

    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
    const _factoryParams = configureFactoryParams(
      factoryParams,
    );

    const search = async (searchParams): Promise<void> => {
      Logger.debug(`useUserOrder/${ssrKey}/search`, searchParams);

      try {
        loading.value = true;
        orders.value = await _factoryParams.searchOrders(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useUserOrder/${ssrKey}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      orders: computed(() => orders.value),
      search,
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
