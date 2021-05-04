import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  CustomQuery,
  FactoryParams,
  generateContext,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseMakeOrder, UseMakeOrderErrors } from '../types';

export interface UseMakeOrderFactoryParams<ORDER> extends FactoryParams {
  make: (context: Context, params: { customQuery?: CustomQuery }) => Promise<ORDER>;
}

export const useMakeOrderFactory = <ORDER>(
  factoryParams: UseMakeOrderFactoryParams<ORDER>,
) => function useMakeOrder(): UseMakeOrder<ORDER> {
  const order = sharedRef<ORDER>(null, 'useMakeOrder-order');
  const loading = sharedRef<boolean>(false, 'useMakeOrder-loading');
  const error = sharedRef<UseMakeOrderErrors>({}, 'useMakeOrder-error');
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  const make = async (params = { customQuery: null }) => {
    Logger.debug('useMakeOrder.make');

    try {
      loading.value = true;
      error.value.make = null;
      order.value = await _factoryParams.make(params);
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
