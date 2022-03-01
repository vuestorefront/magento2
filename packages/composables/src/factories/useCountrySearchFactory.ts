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
import { UseCountrySearch, UseCountrySearchErrors } from '../types/composables';

export interface UseCountryFactoryParams<COUNTRIES, COUNTRY, API extends PlatformApi = any> extends FactoryParams<API>{
  load: (context: Context, params?: ComposableFunctionArgs<{}>) => Promise<COUNTRIES[]>;
  search: (context: Context, params: ComposableFunctionArgs<{ id: string }>) => Promise<COUNTRY>;
}

export function useCountrySearchFactory<COUNTRIES,
  COUNTRY,
  API extends PlatformApi = any>(factoryParams: UseCountryFactoryParams<COUNTRIES, COUNTRY, API>) {
  return function useCountrySearch(cacheId: string = ''): UseCountrySearch<COUNTRIES, COUNTRY, API> {
    const ssrKey = cacheId || 'useCountrySearchFactory';
    const countries = sharedRef<COUNTRIES[]>([], `${ssrKey}-countries`);
    // @ts-ignore
    const country = sharedRef<COUNTRY>({}, `${ssrKey}-country`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);
    const error = sharedRef<UseCountrySearchErrors>({
      load: null,
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const load = async (params?: ComposableFunctionArgs<{}>): Promise<COUNTRIES[]> => {
      Logger.debug(`useCountrySearch/${ssrKey}/load`);

      try {
        loading.value = true;

        const data = await _factoryParams.load(params);

        countries.value = data;

        error.value.load = null;

        return data;
      } catch (err) {
        error.value.load = err;
        Logger.error(`useCountrySearch/${ssrKey}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    // eslint-disable-next-line consistent-return
    const search = async (params: ComposableFunctionArgs<{ id: string }>): Promise<COUNTRY> => {
      Logger.debug(`useCountrySearch/${ssrKey}/search`);

      try {
        loading.value = true;

        const data = await _factoryParams.search(params);

        country.value = data;

        error.value.search = null;

        return data;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useCountrySearch/${ssrKey}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      load,
      search,
      countries: computed(() => countries.value),
      country: computed(() => country.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
