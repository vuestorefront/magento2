/* istanbul ignore file */
import {
  Context,
  Logger,
  useUserOrderFactory,
  UseUserOrderFactoryParams,
} from '@vue-storefront/core';
import useUser from '../useUser';

const factoryParams: UseUserOrderFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, param) => {
    Logger.debug('[Magento] search user orders', { param });

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    const { data } = await context.$magento.api.customerOrders(param);

    Logger.debug('[Result]:', { data });

    return data.customer.orders;
  },
};

export default useUserOrderFactory<any, any>(factoryParams);
