import { Logger } from '@vue-storefront/core';
import { ref, useContext } from '@nuxtjs/composition-api';
import { PaymentMethodInput } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';
import { setPaymentMethodOnCartCommand } from '~/composables/usePaymentProvider/commands/setPaymentMethodOnCartCommand';
import { useCart } from '~/composables';
import { getAvailablePaymentMethodsCommand } from '~/composables/usePaymentProvider/commands/getAvailablePaymentMethodsCommand';
import { SetPaymentMethodOnCartInputs } from './usePaymentProvider';

export const usePaymentProvider = () => {
  const context = useContext();
  const { cart } = useCart();
  const loading = ref(false);
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const error = ref({
    load: null,
    save: null,
  });

  const save = async (params: ComposableFunctionArgs<{ paymentMethod: PaymentMethodInput }>) => {
    Logger.debug('usePaymentProvider.save');
    let result = null;

    try {
      loading.value = true;
      const paymentMethodParams: SetPaymentMethodOnCartInputs = {
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
    loading,
    error,
    load,
    save,
  };
};

export default usePaymentProvider;
