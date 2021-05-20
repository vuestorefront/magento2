import {
  Context,
  Logger,
} from '@vue-storefront/core';
import {
  SetPaymentMethodOnCartInput,
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
    Logger.debug('[Magento] loadPaymentProvider');

    const { data } = await context
      .$magento
      .api
      .getAvailablePaymentMethods({ cartId: context.cart.cart.id }, customQuery);

    return data
      .cart
      .available_payment_methods;
  },

  save: async (context: Context, { paymentMethod }) => {
    Logger.debug('[Magento] savePaymentProvider');

    const paymentMethodParams: SetPaymentMethodOnCartInput = {
      cart_id: context.cart.cart.value.id,
      payment_method: {
        ...paymentMethod,
      },
    };

    const { data } = await context
      .$magento
      .api
      .setPaymentMethodOnCart(paymentMethodParams);

    return data
      .setPaymentMethodOnCart
      .cart
      .selected_payment_method;
  },
};

export default usePaymentProviderFactory<any, any>(factoryParams);
