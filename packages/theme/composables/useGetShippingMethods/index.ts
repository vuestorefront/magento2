import {
  ComposableFunctionArgs, Logger,
} from '@vue-storefront/core';
import { ref, useContext } from '@nuxtjs/composition-api';
import { getGuestShippingMethodsCommand } from '~/composables/useGetShippingMethods/commands/getGuestShippingMethodsCommand';
import { getCustomerShippingMethodsCommand } from '~/composables/useGetShippingMethods/commands/getCustomerShippingMethodsCommand';
import { UseGetShippingMethodsInterface } from '~/composables/useGetShippingMethods/useGetShippingMethods';
import { AvailableShippingMethod } from '~/modules/GraphQL/types';

export function useGetShippingMethods(): UseGetShippingMethodsInterface<AvailableShippingMethod> {
  // @ts-ignore
  const loading = ref(false);
  const error = ref({ load: null });
  const { app } = useContext();
  const { context } = app;

  // eslint-disable-next-line consistent-return
  const load = async (params: ComposableFunctionArgs<{ cartId: string }>): Promise<any[]> => {
    Logger.debug('useGetShippingMethods/load', { params });
    let result = [];
    try {
      loading.value = true;
      const isGuest = params.cartId;

      result = await (isGuest
        ? getGuestShippingMethodsCommand.execute(context, params)
        : getCustomerShippingMethodsCommand.execute(context)
      );

      Logger.debug('[Result]:', { result });

      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useGetShippingMethods/load', err);
    } finally {
      loading.value = false;
    }

    return result;
  };

  return {
    load,
    loading,
    error,
  };
}
