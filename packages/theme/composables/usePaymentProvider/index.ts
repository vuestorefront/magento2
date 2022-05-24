import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { setPaymentMethodOnCartCommand } from '~/composables/usePaymentProvider/commands/setPaymentMethodOnCartCommand';
import { useCart } from '~/composables';
import { getAvailablePaymentMethodsCommand } from '~/composables/usePaymentProvider/commands/getAvailablePaymentMethodsCommand';
import type PaymentMethodParams from './PaymentMethodParams';
import type {
  UsePaymentProviderErrors,
  UsePaymentProviderInterface,
  UsePaymentProviderSaveParams,
} from './usePaymentProvider';

/**
 * The `usePaymentProvider()` composable allows loading the available payment
 * methods for current cart, and selecting (saving) one of them.
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

  const load = async () => {
    Logger.debug('usePaymentProvider.load');
    let result = null;

    try {
      loading.value = true;
      result = await getAvailablePaymentMethodsCommand.execute(context, cart.value.id);
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
