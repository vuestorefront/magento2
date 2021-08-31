import {
  Context, Logger, UseMakeOrder, useMakeOrderFactory, UseMakeOrderFactoryParams,
} from '@absolute-web/vsf-core';
import { Order } from '@absolute-web/magento-api';
import useCart from '../useCart';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
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
};

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;
