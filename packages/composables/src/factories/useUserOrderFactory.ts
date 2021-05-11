import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  CustomQuery,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseUserOrder, UseUserOrderErrors } from '../types';

export interface UseUserOrderFactoryParams<ORDERS, ORDER_SEARCH_PARAMS> extends FactoryParams {
  searchOrders: (context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<ORDERS>;
}

export function useUserOrderFactory<ORDERS, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrderFactoryParams<ORDERS, ORDER_SEARCH_PARAMS>) {
  return function useUserOrder(): UseUserOrder<ORDERS, ORDER_SEARCH_PARAMS> {
    // @ts-ignore
    const orders = sharedRef<ORDERS>([], 'useUserOrder-orders');
    const loading = sharedRef<boolean>(false, 'useUserOrder-loading');
    const error = sharedRef<UseUserOrderErrors>({}, 'useUserOrder-error');
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const search = async (searchParams): Promise<void> => {
      Logger.debug('useUserOrder.search', searchParams);

      try {
        loading.value = true;
        error.value.search = null;
        orders.value = await _factoryParams.searchOrders(searchParams);
      } catch (err) {
        error.value.search = err;
        Logger.error('useUserOrder/search', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      error: computed(() => error.value),
      loading: computed(() => loading.value),
      orders: computed(() => orders.value),
      search,
    };
  };
}
