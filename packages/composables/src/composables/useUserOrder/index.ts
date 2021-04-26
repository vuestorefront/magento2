/* istanbul ignore file */
import { Context, Logger } from '@vue-storefront/core';
import { CustomerOrder, CustomerOrdersQueryVariables } from '@vue-storefront/magento-api';
import {
  useUserOrderFactory,
  UseUserOrderFactoryParams,
} from '../../factories/useUserOrderFactory';
import useUser from '../useUser';

const factoryParams: UseUserOrderFactoryParams<CustomerOrder[], CustomerOrdersQueryVariables> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, param): Promise<CustomerOrder[]> => {
    Logger.debug('[Magento] searchOrders');

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    const { data } = await context.$magento.api.customerOrders(param);

    return data.customer.orders.items || [];
  },
};

export default useUserOrderFactory<CustomerOrder[], CustomerOrdersQueryVariables>(factoryParams);
