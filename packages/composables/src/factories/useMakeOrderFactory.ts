import { computed } from '@vue/composition-api';
import {
  Context,
  CustomQuery,
  FactoryParams,
  generateContext,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseMakeOrder, UseMakeOrderErrors } from '../types';
import { configureFactoryParams } from '../utils';

export interface UseMakeOrderFactoryParams<ORDER> extends FactoryParams {
  make: (context: Context, params: { customQuery?: CustomQuery }) => Promise<ORDER>;
}

export const useMakeOrderFactory = <ORDER>(
  factoryParams: UseMakeOrderFactoryParams<ORDER>,
) => function useMakeOrder(): UseMakeOrder<ORDER> {
  const _factoryParams = configureFactoryParams(factoryParams);
  const context = generateContext(factoryParams);
  const order = sharedRef<ORDER>(null, 'useMakeOrder-order');
  const loading = sharedRef<boolean>(false, 'useMakeOrder-loading');
  const error = sharedRef<UseMakeOrderErrors>({}, 'useMakeOrder-error');

  const make = async (params = { customQuery: null }) => {
    Logger.debug('useMakeOrder.make');

    try {
      loading.value = true;
      error.value.make = null;
      const createdOrder = await factoryParams.make(context, params);
      order.value = createdOrder;
    } catch (err) {
      error.value.make = err;
      Logger.error('useMakeOrder.make', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    make,
    order,
  };
};
