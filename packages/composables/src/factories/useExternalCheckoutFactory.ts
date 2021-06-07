import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { computed } from 'vue-demi';
import { UseExternalCheckout } from '../types/composeables';

export interface UseExternalCheckoutFactoryParams extends FactoryParams {
  initializeCheckout: (context: Context, baseUrl: string) => Promise<string>;
}

export const useExternalCheckoutFactory = (
  factoryParams: UseExternalCheckoutFactoryParams,
) => {
  function useExternalCheckout(ssrKey = 'useExternalCheckout'): UseExternalCheckout {
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef({
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line @typescript-eslint/require-await,consistent-return
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
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  }

  return useExternalCheckout;
};
