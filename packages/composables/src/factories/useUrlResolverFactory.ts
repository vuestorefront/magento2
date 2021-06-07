import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { computed } from 'vue-demi';
import { UseUrlResolver } from '../types/composeables';

export interface UseUrlResolverFactoryParams<ROUTER> extends FactoryParams {
  search: (context: Context, url: string) => Promise<ROUTER>;
}

export const useUrlResolverFactory = <ROUTER>(
  factoryParams: UseUrlResolverFactoryParams<ROUTER>,
) => function useRouter(ssrKey = 'useRouter'): UseUrlResolver<ROUTER> {
  // @ts-ignore
  const result = sharedRef<ROUTER>({}, `${ssrKey}-result`);
  const loading = sharedRef(false, `${ssrKey}-loading`);
  const error = sharedRef({
    search: null,
  }, `${ssrKey}-error`);
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  // eslint-disable-next-line consistent-return
  const search = async (url: string) => {
    Logger.debug(`useRouter/${ssrKey}/search`);
    loading.value = true;

    try {
      const data = await _factoryParams.search(url);

      result.value = data;

      return data;
    } catch (err) {
      error.value.search = err;

      Logger.error(`useRouter/${ssrKey}/search`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
