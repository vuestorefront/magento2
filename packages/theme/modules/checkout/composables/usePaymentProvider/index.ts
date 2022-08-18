import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { setPaymentMethodOnCartCommand } from '~/modules/checkout/composables/usePaymentProvider/commands/setPaymentMethodOnCartCommand';
import { getAvailablePaymentMethodsCommand } from '~/modules/checkout/composables/usePaymentProvider/commands/getAvailablePaymentMethodsCommand';
import useCart from '~/modules/checkout/composables/useCart';

import type {
  UsePaymentProviderErrors,
  UsePaymentProviderInterface,
  UsePaymentProviderSaveParams,
  PaymentMethodParams,
} from './usePaymentProvider';
import { CustomQuery } from '~/types/core';

/**
 * Allows loading the available payment
 * methods for current cart, and selecting (saving) one of them.
 *
 * See the {@link UsePaymentProviderInterface} for a list of methods and values available in this composable.
 */
export function usePaymentProvider(): UsePaymentProviderInterface {
  const context = useContext();
  const { cart } = useCart();
  const loading = ref(false);
  const error = ref<UsePaymentProviderErrors>({
    load: null,
    save: null,
  });

  const save = async (params: UsePaymentProviderSaveParams) => {
    Logger.debug('usePaymentProvider.save');
    let result = null;

    try {
      loading.value = true;
      const paymentMethodParams: PaymentMethodParams = {
        cart_id: cart.value.id,
        payment_method: {
          ...params.paymentMethod,
        },
        customQuery: params.customQuery,
      };

      result = await setPaymentMethodOnCartCommand.execute(context, paymentMethodParams);
      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('usePaymentProvider/save', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result });
    return result;
  };

  const load = async (customQuery?: CustomQuery) => {
    Logger.debug('usePaymentProvider.load');
    let result = null;

    try {
      loading.value = true;
      result = await getAvailablePaymentMethodsCommand.execute(context, cart.value.id, customQuery);
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('usePaymentProvider/load', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result });
    return result;
  };

  return {
    load,
    save,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export * from './usePaymentProvider';
export default usePaymentProvider;
