/* istanbul ignore file */
import {
  Context,
  Logger,
  useUserOrderFactory,
  UseUserOrderFactoryParams,
} from '@vue-storefront/core';
import { CustomerOrder, CustomerOrdersQueryVariables } from '@vue-storefront/magento-api';
import useUser from '../useUser';

const factoryParams: UseUserOrderFactoryParams<CustomerOrder[], CustomerOrdersQueryVariables> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, param): Promise<CustomerOrder[]> => {
    Logger.debug('[Magento] search user orders', { param });

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    const { data } = await context.$magento.api.customerOrders(param);

    Logger.debug('[Result]:', { data });

    return (data.customer.orders.items || []) as unknown as CustomerOrder[];
  },
};

export default useUserOrderFactory<CustomerOrder[], CustomerOrdersQueryVariables>(factoryParams);
