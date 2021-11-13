import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { FetchPolicy } from '../types';
import { UseCustomQuery } from '../types/composables';

export interface UseCustomQueryFactoryFactoryParams<QUERY_VARIABLES, QUERY_RETURN, API extends PlatformApi = any> extends FactoryParams<API> {
  query: (context: Context, {
    variables,
    fetchPolicy,
  }: {
    variables: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }) => Promise<QUERY_RETURN>;
}

export const useCustomQueryFactory = <QUERY, QUERY_VARIABLES, QUERY_RETURN = any,
  API extends PlatformApi = any>(
  factoryParams: UseCustomQueryFactoryFactoryParams<QUERY_VARIABLES, QUERY_RETURN, API>,
) => function useCustomQuery(ssrKey = 'useCustomQuery'): UseCustomQuery<QUERY, QUERY_VARIABLES, QUERY_RETURN, API> {
  // @ts-ignore
  const queryString = sharedRef<QUERY>('', `${ssrKey}-queryString`);
  const queryStringComputed = computed(() => queryString.value);
  // @ts-ignore
  const result = sharedRef<QUERY_RETURN>({}, `${ssrKey}-result`);
  const loading = sharedRef(false, `${ssrKey}-loading`);
  const error = sharedRef({
    query: null,
  }, `${ssrKey}-error`);
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  // eslint-disable-next-line consistent-return
  const query = async ({
    variables,
    fetchPolicy,
  }: {
    variables: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug(`useCustomQuery/${ssrKey}/query`);
    loading.value = true;

    try {
      const data = await _factoryParams.query({
        query: queryStringComputed.value,
        variables,
        fetchPolicy,
      });

      result.value = data;

      return data;
    } catch (err) {
      error.value.search = err;

      Logger.error(`useCustomQuery/${ssrKey}/query`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    setQueryString: (newQueryString: string) => {
      queryString.value = newQueryString;
    },
    queryString: queryStringComputed,
    query,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
