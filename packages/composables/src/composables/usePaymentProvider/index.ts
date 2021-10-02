import {
  Context,
  Logger,
} from '@vue-storefront/core';
import {
  SetPaymentMethodOnCartInputs,
} from '@vue-storefront/magento-api';
import useCart from '../useCart';
import { usePaymentProviderFactory, UsePaymentProviderParams } from '../../factories/usePaymentProviderFactory';

const factoryParams: UsePaymentProviderParams<any, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadPaymentProvider', { customQuery });
    const cartId = context.cart.cart.value.id;
    const { data } = await context
      .$magento
      .api
      .getAvailablePaymentMethods({ cartId }, customQuery);

    Logger.debug('[Result]:', { data });

    return data
      .cart
      .available_payment_methods;
  },

  save: async (context: Context, { paymentMethod }) => {
    Logger.debug('[Magento] savePaymentProvider', { paymentMethod });

    const paymentMethodParams: SetPaymentMethodOnCartInputs = {
      cart_id: context.cart.cart.value.id,
      payment_method: {
        ...paymentMethod,
      },
    };

    const { data } = await context
      .$magento
      .api
      .setPaymentMethodOnCart(paymentMethodParams);

    Logger.debug('[Result]:', { data });

    return data
      .setPaymentMethodOnCart
      .cart
      .available_payment_methods;
  },
};

export default usePaymentProviderFactory<any, any>(factoryParams);
