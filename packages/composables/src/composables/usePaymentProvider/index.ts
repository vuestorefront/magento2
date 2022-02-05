import {
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import {
  PaymentMethodInput,
  SelectedPaymentMethod,
  SetPaymentMethodOnCartInputs,
} from '@absolute-web/magento-api';
import useCart from '../useCart';
import { usePaymentProviderFactory, UsePaymentProviderParams } from '../../factories/usePaymentProviderFactory';

const factoryParams: UsePaymentProviderParams<SelectedPaymentMethod, PaymentMethodInput> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadPaymentProvider', { customQuery });

    if (!context.cart.cart?.value?.selected_payment_method) {
      await context.cart.load({ customQuery });
    }

    if (!context.cart.cart?.value) {
      throw context.cart.error.value.load ? context.cart.error.value.load : new Error('Error while loading payment methods');
    }

    return context
      .cart
      .cart
      .value?.selected_payment_method;
  },

  save: async (context: Context, params) => {
    Logger.debug('[Magento] savePaymentProvider', { params });

    const cartId = context.$magento.config.state.getCartId();

    const paymentMethodParams: SetPaymentMethodOnCartInputs = {
      cart_id: cartId,
      payment_method: {
        ...params.paymentMethod,
      },
    };

    const { data } = await context
      .$magento
      .api
      .setPaymentMethodOnCart(paymentMethodParams);

    Logger.debug('[Result]:', { data });

    const { cart } = data
      .setPaymentMethodOnCart;

    context.cart.setCart({
      ...context.cart.cart.value,
      selected_payment_method: cart.selected_payment_method,
    });

    return cart.selected_payment_method;
  },
};

export default usePaymentProviderFactory<SelectedPaymentMethod, PaymentMethodInput>(factoryParams);
