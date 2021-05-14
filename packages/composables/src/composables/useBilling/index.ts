import {
  Context,
  Logger,
  useBillingFactory,
  UseBillingParams,
} from '@vue-storefront/core';
import { BillingAddressInput, BillingCartAddress, CartAddressInput } from '@vue-storefront/magento-api';
import useCart from '../useCart';

const factoryParams: UseBillingParams<BillingCartAddress, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  provide() {
    return {
      cart: useCart(),
    };
  },

  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadBilling');
    if (!context.cart.cart?.value?.billing_address) {
      await context.cart.load({ customQuery });
    }
    return context.cart.cart.value.billing_address;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (
    context: Context,
    params,
  ) => {
    Logger.debug('[Magento] setBillingAddress');
    const id = context.$magento.config.state.getCartId();
    Logger.debug(id);
    Logger.debug(typeof id);
    const address = params.billingDetails as unknown as CartAddressInput;

    const billingAddress: BillingAddressInput = {
      address,
      same_as_shipping: true,
    };
    // const { id } = context.cart.cart.value;
    const { data } = await context.$magento.api.setBillingAddressOnCart({
      cart_id: id,
      billing_address: billingAddress,
    });

    return data.setBillingAddressOnCart.cart.billing_address;
  },
};

export default useBillingFactory<BillingCartAddress, any>(factoryParams);
