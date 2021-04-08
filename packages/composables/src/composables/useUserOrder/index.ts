/* istanbul ignore file */

import { Context, Logger } from '@vue-storefront/core';
import {
  useUserOrderFactory,
  UseUserOrderFactoryParams,
} from '../../factories/useUserOrderFactory';
import { OrderSearchParams } from '../../types';
import { CustomerOrder } from '../../../../api-client';
import useUser from '../useUser';

const factoryParams: UseUserOrderFactoryParams<CustomerOrder[], OrderSearchParams> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams): Promise<CustomerOrder[]> => {
    Logger.debug('[Magento] searchOrders');
    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    const response = await context.$ma.api.customerOrders();
    return response.data.customerOrders.items || [] as CustomerOrder[];
  },
};

export default useUserOrderFactory<CustomerOrder[], OrderSearchParams>(factoryParams);
