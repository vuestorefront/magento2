import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { Order, PaymentMethodInput } from '@absolute-web/magento-api';
import { useMakeOrderFactory, UseMakeOrderFactoryParams } from '../../factories/useMakeOrderFactory';
import useCart from '../useCart';

const factoryParams: UseMakeOrderFactoryParams<Order, PaymentMethodInput> = {
  provide() {
    return {
      cart: useCart(),
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, params): Promise<Order> => {
    Logger.debug('[Magento] Make Order', { params });
    const { compliance: { value: compliance }, cart: { value: { id } } } = context.cart;
    const { data } = await context.$magento.api.placeOrder({ cart_id: id, ...compliance });

    Logger.debug('[Result]:', { data });

    return data.placeOrder.order;
  },

  setPaymentAndMake: async (context: Context, { paymentMethod }): Promise<Order> => {
    Logger.debug('[Magento] Make Order', { paymentMethod });
    const { compliance: { value: compliance }, cart: { value: { id } } } = context.cart;

    const { data } = await context.$magento.api.setPaymentMethodAndPlaceOrder({
      setPaymentMethod: {
        cart_id: id,
        payment_method: {
          ...paymentMethod,
        },
      },
      placeOrder: {
        cart_id: id,
        ...compliance
      }
    });

    Logger.debug('[Result]:', { data });

    return data.placeOrder.order;
  },
};

const useMakeOrder = useMakeOrderFactory<Order, PaymentMethodInput>(factoryParams);

export default useMakeOrder;
