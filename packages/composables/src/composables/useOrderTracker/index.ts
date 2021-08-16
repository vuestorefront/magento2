import {
  Context,
  UseUserOrderFactoryParams,
} from '@absolute-web/vsf-core';
import { CustomerOrders, FocusTrackedOrdersQueryVariables } from '@absolute-web/magento-api';
import { useUserOrderFactory } from '../../factories/useUserOrderFactory';

const factoryParams: UseUserOrderFactoryParams<CustomerOrders, FocusTrackedOrdersQueryVariables> = {
  searchOrders: async (context: Context, param): Promise<CustomerOrders> => {
    const { data } = await context.$magento.api.orderTracker(param);

    return (data.trackedOrder || {}) as unknown as CustomerOrders;
  },
};

export default useUserOrderFactory<CustomerOrders, FocusTrackedOrdersQueryVariables>(factoryParams);
