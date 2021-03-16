import { Order, UseMakeOrder } from '../../types';
import { Context } from '@vue-storefront/core'
import { useMakeOrderFactory } from '../../factories/useMakeOrderFactory';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }): Promise<Order> => {
    console.log('Mocked: makeOrder');
    return {
      id: '123-456-7890'
    };
  }
};

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;