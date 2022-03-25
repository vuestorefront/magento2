import { ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { BillingCartAddress, Maybe } from '~/modules/GraphQL/types';
import { saveBillingAddressCommand } from '~/composables/useBilling/commands/saveBillingAddressCommand';
import { useShippingProvider, useCart } from '~/composables';

export const useBilling = () => {
  const context = useContext();
  const { load: loadShippingAddress, save: saveShippingAddress } = useShippingProvider();
  const { cart, load: loadCart } = useCart();

  const loading = ref(false);
  const error = ref({
    load: null,
    save: null,
  });

  const load = async ({ customQuery = null } = {}): Promise<Maybe<BillingCartAddress>> => {
    Logger.debug('useBilling.load');
    let billingInfo = null;

    try {
      loading.value = true;
      if (!cart?.value?.billing_address) {
        await loadCart({ customQuery });
      }

      billingInfo = cart?.value?.billing_address ?? null;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useBilling/load', err);
    } finally {
      loading.value = false;
    }

    return billingInfo;
  };

  const save = async ({ billingDetails }): Promise<Maybe<BillingCartAddress>> => {
    Logger.debug('useBilling.save');
    let billingInfo = null;

    try {
      loading.value = true;
      billingInfo = await saveBillingAddressCommand.execute(context, cart.value.id, billingDetails);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      /**
       * This is a workaround needed due to Magento GraphQL API
       * cleaning the Shipping method after defining the billing address
       */
      const shippingMethod = await loadShippingAddress();
      Logger.debug('[Magento]: Defining the shipping method as:', JSON.stringify(shippingMethod, null, 2));

      await saveShippingAddress({
        shippingMethod: {
          carrier_code: shippingMethod.carrier_code,
          method_code: shippingMethod.method_code,
        },
      });
      /**
       * End of GraphQL Workaround
       */

      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('useBilling/save', err);
    } finally {
      loading.value = false;
    }

    return billingInfo;
  };

  return {
    loading,
    error,
    load,
    save,
  };
};

export default useBilling;
