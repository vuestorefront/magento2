import {
  Context,
  CustomQuery,
  FactoryParams,
  generateContext,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { Ref, computed } from '@vue/composition-api';
import { UseShippingProvider, UseShippingProviderErrors } from '../types';
import { configureFactoryParams } from '../utils';

export interface UseShippingProviderParams<STATE, SHIPPING_METHOD> extends FactoryParams {
  load: (context: Context, params: { state: Ref<STATE>, customQuery?: CustomQuery }) => Promise<STATE>;
  save: (context: Context, params: { state: Ref<STATE>, shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }) => Promise<STATE>;
}

export const useShippingProviderFactory = <STATE, SHIPPING_METHOD>(
  factoryParams: UseShippingProviderParams<STATE, SHIPPING_METHOD>,
) => function useShippingProvider(): UseShippingProvider<STATE, SHIPPING_METHOD> {
  const _factoryParams = configureFactoryParams(factoryParams);
  const context = generateContext(factoryParams);
  const state = sharedRef<STATE>(null, 'useShippingProvider-response');
  const loading = sharedRef<boolean>(false, 'useShippingProvider-loading');
  const error = sharedRef<UseShippingProviderErrors>({}, 'useShippingProvider-error');

  const setState = (newState: STATE) => {
    state.value = newState;
    Logger.debug('useShippingProvider.setState', newState);
  };

  const save = async ({
    shippingMethod,
    customQuery = null,
  }) => {
    Logger.debug('useShippingProvider.save');

    try {
      loading.value = true;
      error.value.save = null;
      state.value = await factoryParams.save(context,
        {
          shippingMethod,
          customQuery,
          state,
        });
    } catch (err) {
      error.value.save = err;
      Logger.error('useShippingProvider/save', err);
    } finally {
      loading.value = false;
    }
  };

  const load = async ({ customQuery = null } = {}) => {
    Logger.debug('useShippingProvider.load');

    try {
      loading.value = true;
      error.value.load = null;
      state.value = await factoryParams.load(context,
        {
          customQuery,
          state,
        });
    } catch (err) {
      error.value.load = err;
      Logger.error('useShippingProvider/load', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    error: computed(() => error.value),
    load,
    loading: computed(() => loading.value),
    save,
    setState,
    state,
  };
};
