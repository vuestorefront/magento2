import {
  Context,
  Logger,
} from '@vue-storefront/core';
import {
  PaymentMethodInput,
  SetPaymentMethodOnCartInputs,
} from '@vue-storefront/magento-api';
import useCart from '../useCart';
import { usePaymentProviderFactory, UsePaymentProviderParams } from '../../factories/usePaymentProviderFactory';

const factoryParams: UsePaymentProviderParams<any, PaymentMethodInput> = {
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
      .getAvailablePaymentMethods({ cartId });

    Logger.debug('[Result]:', { data });

    return data
      .cart
      .available_payment_methods;
  },

  save: async (context: Context, params) => {
    Logger.debug('[Magento] savePaymentProvider', { params });

    const paymentMethodParams: SetPaymentMethodOnCartInputs = {
      cart_id: context.cart.cart.value.id,
      payment_method: {
        ...params.paymentMethod,
      },
    };

    const { data } = await context
      .$magento
      .api
      .setPaymentMethodOnCart(paymentMethodParams, params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data
      .setPaymentMethodOnCart
      .cart
      .available_payment_methods;
  },
};

export default usePaymentProviderFactory<any, PaymentMethodInput>(factoryParams);
