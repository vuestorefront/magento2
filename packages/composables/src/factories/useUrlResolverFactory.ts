// import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseRouter } from '../types';

export interface UseUrlResolverFactoryParams<ROUTER> extends FactoryParams {
  search: (context: Context, url: string) => Promise<ROUTER>;
}

export const useUrlResolverFactory = <ROUTER>(
  factoryParams: UseUrlResolverFactoryParams<ROUTER>,
) => function useRouter(id?: string): UseRouter<ROUTER> {
  const ssrKey = id || 'useRouter';
  // @ts-ignore
  const result = sharedRef<ROUTER>({}, `${ssrKey}-result`);
  const loading = sharedRef(false, `${ssrKey}-loading`);
  const error = sharedRef({
    search: null,
  }, `${ssrKey}-error`);
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

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
    result: result.value, // @TODO: Check CAPI
    loading: loading.value, // @TODO: Check CAPI
    error: error.value, // @TODO: Check CAPI
  };
};
