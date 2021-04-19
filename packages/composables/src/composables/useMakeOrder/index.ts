import { Context } from '@vue-storefront/core';
import { Order, UseMakeOrder } from '../../types';
import { useMakeOrderFactory } from '../../factories/useMakeOrderFactory';
import useCart from '../useCart';

const factoryParams = {
  provide() {
    return {
      cart: useCart(),
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }): Promise<Order> => {
    console.log('[Magento] Make Order');
    const { id } = context.cart.cart.value;
    const placeOrderResponse = await context.$magento.api.placeOrder({ cart_id: id });
    return placeOrderResponse.data.order;
  },
};

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;
