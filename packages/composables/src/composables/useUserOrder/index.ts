/* istanbul ignore file */

import { Context } from '@vue-storefront/core';

import {
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '../../factories/useUserOrderFactory'

import { OrdersResponse, OrderSearchParams } from '../../types';

const params: UseUserOrderFactoryParams<OrdersResponse, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams): Promise<OrdersResponse> => {
    console.log('Mocked: searchOrders');

    return {
      data: [],
      total: 0
    };
  }
};

export default useUserOrderFactory<OrdersResponse, OrderSearchParams>(params);