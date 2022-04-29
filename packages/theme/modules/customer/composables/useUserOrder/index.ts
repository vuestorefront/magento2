import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type {
  UseUserOrderErrors,
  UseUserOrderInterface,
  UseUserOrderSearchParams,
} from './useUserOrder';

/**
 * The `useUserOrder()` composable allows fetching customer orders.
 *
 * See the {@link UseUserOrderInterface} page for more information.
 */
export function useUserOrder(): UseUserOrderInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseUserOrderErrors>({
    search: null,
  });

  const search = async (params: UseUserOrderSearchParams) => {
    let results = null;

    try {
      loading.value = true;

      Logger.debug('[Magento] search user orders', { params });

      const { data } = await app.$vsf.$magento.api.customerOrders(params);

      Logger.debug('[Result]:', { data });

      results = data?.customer?.orders ?? null;
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
    loading: readonly(loading),
    error: readonly(error),
  };
}

export default useUserOrder;
export * from './useUserOrder';
