// import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseExternalCheckout } from '../types';

export interface UseExternalCheckoutFactoryParams extends FactoryParams {
  initializeCheckout: (context: Context, baseUrl: string) => Promise<string>;
}

export const useExternalCheckoutFactory = (
  factoryParams: UseExternalCheckoutFactoryParams,
) => {
  function useExternalCheckout(id?: string): UseExternalCheckout {
    const ssrKey = id || 'useExternalCheckout';
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef({
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const initializeCheckout = async (baseUrl: string): Promise<string> => {
      Logger.debug(`useExternalCheckout/${ssrKey}/initializeCheckout`);
      loading.value = true;

      try {
        return _factoryParams.initializeCheckout(baseUrl);
      } catch (err) {
        error.value.search = err;

        Logger.error(`useExternalCheckout/${ssrKey}/initializeCheckout`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      initializeCheckout,
      loading: loading.value, // @TODO: Check CAPI
      error: error.value, // @TODO: Check CAPI
    };
  }

  return useExternalCheckout;
};
