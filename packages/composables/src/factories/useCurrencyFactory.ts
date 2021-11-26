import { computed } from 'vue-demi';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams,
  FactoryParams,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseCurrency } from '../types/composables';

export interface UseCurrencyFactoryParams<CURRENCIES, CURRENCY_PARAM, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context) => Promise<CURRENCIES>;
  change: (context: Context, params: CURRENCY_PARAM) => void
}

export function useCurrencyFactory<CURRENCIES,
  API extends PlatformApi = any>(factoryParams: UseCurrencyFactoryParams<CURRENCIES, API>) {
  return function useCurrency(cacheId: string = ''): UseCurrency<CURRENCIES, CURRENCY_PARAM, API> {
    const ssrKey = cacheId || 'useCurrencyFactory';
    // @ts-ignore
    const currencies = sharedRef<CURRENCIES>([], `${ssrKey}-currencies`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async () => {
      Logger.debug(`useCurrency/${ssrKey}/load`);
      loading.value = true;
      try {
        currencies.value = await _factoryParams.load();
      } finally {
        loading.value = false;
      }
    };

    const change = async (params: CURRENCY_PARAM) => {
      Logger.debug(`useCurrency/${ssrKey}/change`);
      loading.value = true;
      try {
        await _factoryParams.change(params);
      } finally {
        loading.value = false;
      }
    };

    return {
      load,
      change,
      currencies: computed(() => currencies.value),
      loading: computed(() => loading.value)
    };
  };
}
