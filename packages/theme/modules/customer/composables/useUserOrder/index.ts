import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type {
  UseUserOrderErrors,
  UseUserOrderInterface,
  UseUserOrderSearchParams,
} from './useUserOrder';

/**
 * Allows fetching customer orders.
 *
 * See the {@link UseUserOrderInterface} for a list of methods and values available in this composable.
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

      const { data } = await app.$vsf.$magento.api.customerOrders(params, params?.customQuery ?? null, params?.customHeaders);

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
