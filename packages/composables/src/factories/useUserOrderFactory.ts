import { Ref, computed } from '@vue/composition-api';
import {
  CustomQuery,
  Context,
  FactoryParams,
  sharedRef,
  Logger,
} from '@vue-storefront/core';
import { UseUserOrder, UseUserOrderErrors } from '../types';
import { configureFactoryParams } from '../utils';

export interface UseUserOrderFactoryParams<ORDERS, ORDER_SEARCH_PARAMS> extends FactoryParams {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<ORDERS>;
}

export function useUserOrderFactory<ORDERS, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrderFactoryParams<ORDERS, ORDER_SEARCH_PARAMS>) {
  return function useUserOrder(): UseUserOrder<ORDERS, ORDER_SEARCH_PARAMS> {
    const orders: Ref<ORDERS> = sharedRef([], 'useUserOrder-orders');
    const loading: Ref<boolean> = sharedRef(false, 'useUserOrder-loading');
    const error: Ref<UseUserOrderErrors> = sharedRef({}, 'useUserOrder-error');
    const baseFactoryParams = configureFactoryParams(factoryParams);

    const search = async (searchParams): Promise<void> => {
      Logger.debug('useUserOrder.search', searchParams);

      try {
        loading.value = true;
        error.value.search = null;
        orders.value = await baseFactoryParams.searchOrders(searchParams);
      } catch (err) {
        error.value.search = err;
        Logger.error('useUserOrder/search', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      orders: computed(() => orders.value),
      search,
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
