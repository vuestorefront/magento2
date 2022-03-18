import { ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { ComposableFunctionArgs, Maybe } from '~/composables/types';
import { CustomerOrdersQueryVariables, CustomerOrdersQuery } from '~/modules/GraphQL/types';

export const useUserOrder = () => {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref({
    search: null,
  });

  const search = async (params: ComposableFunctionArgs<CustomerOrdersQueryVariables>): Promise<Maybe<Array<CustomerOrdersQuery['customer']['orders']['items']>>> => {
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
    loading,
    error,
  };
};

export default useUserOrder;
