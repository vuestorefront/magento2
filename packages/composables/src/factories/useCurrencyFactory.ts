/**
 * @deprecated since version 1.0.0
 */
import { computed } from '@vue/composition-api';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams,
  FactoryParams,
  ComposableFunctionArgs,
  PlatformApi,
} from '@vue-storefront/core';
import { UseCurrency } from '../types/composables';

export interface UseCurrencyFactoryParams<CURRENCY, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params?: ComposableFunctionArgs<{}>) => Promise<CURRENCY>;
  change: (context: Context, params: ComposableFunctionArgs<{ id: string }>) => void
}

export function useCurrencyFactory<CURRENCY,
  API extends PlatformApi = any>(factoryParams: UseCurrencyFactoryParams<CURRENCY, API>) {
  return function useCurrency(cacheId: string = ''): UseCurrency<CURRENCY, API> {
    const ssrKey = cacheId || 'useCurrencyFactory';
    // @ts-ignore
    const currencies = sharedRef<CURRENCY>([], `${ssrKey}-currencies`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async (params?: ComposableFunctionArgs<{}>) => {
      Logger.debug(`useCurrency/${ssrKey}/load`);
      loading.value = true;
      try {
        currencies.value = await _factoryParams.load(params);
      } finally {
        loading.value = false;
      }
    };

    const change = async (params: ComposableFunctionArgs<{ id: string }>) => {
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
      loading: computed(() => loading.value),
    };
  };
}
