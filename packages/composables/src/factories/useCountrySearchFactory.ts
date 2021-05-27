import { computed } from 'vue-demi';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams,
} from '@vue-storefront/core';
import { UseCountrySearch, UseCountrySearchErrors } from '../types/composeables';

export interface UseCountryFactoryParams<COUNTRIES, COUNTRY> extends FactoryParams{
  load: (context: Context) => Promise<COUNTRIES[]>;
  search: (context: Context, params: { id: string }) => Promise<COUNTRY>;
}

export function useCountrySearchFactory<COUNTRIES, COUNTRY>(factoryParams: UseCountryFactoryParams<COUNTRIES, COUNTRY>) {
  return function useCountrySearch(cacheId: string = ''): UseCountrySearch<COUNTRIES, COUNTRY> {
    const ssrKey = cacheId || 'useCountrySearchFactory';
    const countries = sharedRef<COUNTRIES[]>([], `${ssrKey}-countries`);
    // @ts-ignore
    const country = sharedRef<COUNTRY>({}, `${ssrKey}-country`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);
    const error = sharedRef<UseCountrySearchErrors>({
      loadCountries: null,
      searchCountry: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async (): Promise<COUNTRIES[]> => {
      Logger.debug(`useCountrySearch/${ssrKey}/load`);

      try {
        loading.value = true;

        const data = await _factoryParams.loadCountries();

        countries.value = data;

        error.value.search = null;

        return data;
      } catch (err) {
        error.value.loadCountries = err;
        Logger.error(`useCountrySearch/${ssrKey}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    // eslint-disable-next-line consistent-return
    const search = async (params: { id: string }): Promise<COUNTRY> => {
      Logger.debug(`useCountrySearch/${ssrKey}/search`);

      try {
        loading.value = true;

        const data = await _factoryParams.searchCountry(params);

        country.value = data;

        error.value.searchCountry = null;

        return data;
      } catch (err) {
        error.value.searchCountry = err;
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
