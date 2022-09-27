import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { ComposableFunctionArgs, Countries } from '~/composables/types';
import { Maybe, Country } from '~/modules/GraphQL/types';
import { UseCountrySearchInterface } from './useCountrySearch';

/**
 * Allows fetching a list of countries or a single country by ID
 *
 * See the {@link UseCountrySearchInterface} for a list of methods and values available in this composable.
 */
export function useCountrySearch(): UseCountrySearchInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref({
    search: null,
    load: null,
  });

  const search = async (params: ComposableFunctionArgs<{ id: string }>): Promise<Maybe<Country>> => {
    let results = null;

    try {
      loading.value = true;

      Logger.debug('[Magento]: Search country information based on', { params });

      const { data } = await app.$vsf.$magento.api.country(params.id, params?.customQuery ?? null, params?.customHeaders ?? null);

      Logger.debug('[Result]:', { data });

      results = data?.country ?? null;
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error('useCountrySearch/search', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  const load = async (): Promise<Array<Countries>> => {
    let results = [];

    try {
      loading.value = true;

      Logger.debug('[Magento]: Load available countries on store');

      const { data } = await app.$vsf.$magento.api.countries();

      Logger.debug('[Result]:', { data });

      results = data?.countries ?? [];
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error('useCountrySearch/load', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  return {
    load,
    search,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export * from './useCountrySearch';
export default useCountrySearch;
