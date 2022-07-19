import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import {
  ComposableFunctionArgs,
} from '~/composables/types';
import { Logger } from '~/helpers/logger';
import { getGuestShippingMethodsCommand } from '~/modules/checkout/composables/useGetShippingMethods/commands/getGuestShippingMethodsCommand';
import { getCustomerShippingMethodsCommand } from '~/modules/checkout/composables/useGetShippingMethods/commands/getCustomerShippingMethodsCommand';
import { UseGetShippingMethodsInterface } from '~/modules/checkout/composables/useGetShippingMethods/useGetShippingMethods';
import { AvailableShippingMethod } from '~/modules/GraphQL/types';

/**
 * Allows fetching shipping methods available for a given cart.
 *
 * See the {@link UseGetShippingMethodsInterface} for a list of methods and values available in this composable.
 */
export function useGetShippingMethods(): UseGetShippingMethodsInterface<AvailableShippingMethod> {
  const loading = ref(false);
  const error = ref({ load: null });
  const { app } = useContext();
  const { context } = app;

  const load = async (params: ComposableFunctionArgs<{ cartId: string }>): Promise<any[]> => {
    Logger.debug('useGetShippingMethods/load', { params });
    let result = [];
    try {
      loading.value = true;
      const isGuest = params.cartId;

      result = await (isGuest
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ? getGuestShippingMethodsCommand.execute(context, params)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        : getCustomerShippingMethodsCommand.execute(context, params)
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
    loading: readonly(loading),
    error: readonly(error),
  };
}

export * from './useGetShippingMethods';
