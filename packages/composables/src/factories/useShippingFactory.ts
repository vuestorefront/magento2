import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context, CustomQuery,
  FactoryParams,
  generateContext,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseShipping, UseShippingErrors } from '../types';

export interface UseShippingParams<SHIPPING, SHIPPING_PARAMS> extends FactoryParams {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<SHIPPING>;
  save: (context: Context, params: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING; customQuery?: CustomQuery }) => Promise<SHIPPING>;
}

export const useShippingFactory = <SHIPPING, SHIPPING_PARAMS>(
  factoryParams: UseShippingParams<SHIPPING, SHIPPING_PARAMS>,
) => function useShipping(): UseShipping<SHIPPING, SHIPPING_PARAMS> {
  const _factoryParams = configureFactoryParams(factoryParams);
  const context = generateContext(factoryParams);
  const shipping = sharedRef<SHIPPING>(null, 'useShipping-shipping');
  const loading = sharedRef<boolean>(false, 'useShipping-loading');
  const error = sharedRef<UseShippingErrors>({}, 'useShipping-error');

  const load = async ({ customQuery = null } = {}) => {
    Logger.debug('useShipping.load');

    try {
      loading.value = true;
      error.value.load = null;
      shipping.value = await _factoryParams.load({ customQuery });
    } catch (err) {
      error.value.load = err;
      Logger.error('useShipping/load', err);
    } finally {
      loading.value = false;
    }
  };

  const save = async (saveParams) => {
    Logger.debug('useShipping.save');

    try {
      loading.value = true;
      error.value.save = null;
      shipping.value = await factoryParams.save(context, saveParams);
    } catch (err) {
      error.value.save = err;
      Logger.error('useShipping/save', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    // @ts-ignore
    error: computed(() => error.value),
    load,
    // @ts-ignore
    loading: computed(() => loading.value),
    save,
    // @ts-ignore
    shipping: computed(() => shipping.value),
  };
};
