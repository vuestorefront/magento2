import {
  Context, Logger, UseMakeOrder, useMakeOrderFactory, UseMakeOrderFactoryParams,
} from '@vue-storefront/core';
import { Order } from '@vue-storefront/magento-api';
import useCart from '../useCart';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
  provide() {
    return {
      cart: useCart(),
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }): Promise<Order> => {
    Logger.debug('[Magento] Make Order', { customQuery });
    const { id } = context.cart.cart.value;
    const { data } = await context.$magento.api.placeOrder({ cart_id: id }, customQuery);

    Logger.debug('[Result]:', { data });

    return data.placeOrder.order;
  },
};

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;
