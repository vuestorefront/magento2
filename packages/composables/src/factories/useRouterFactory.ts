import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseRouter } from '../types';

export interface UseRouterFactoryParams<ROUTER> extends FactoryParams {
  search: (context: Context, url: string) => Promise<ROUTER>;
}

export const useRouterFactory = <ROUTER>(
  factoryParams: UseRouterFactoryParams<ROUTER>,
) => function useRouter(id?: string): UseRouter<ROUTER> {
  const ssrKey = id || 'useFacet';
  // @ts-ignore
  const result = sharedRef<ROUTER>({}, `useRouter-routers-${ssrKey}`);
  const loading = sharedRef(false, `${ssrKey}-loading`);
  const error = sharedRef({
    search: null,
  }, `useRouter-error-${id}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  const search = async (url: string) => {
    Logger.debug(`useRouter/${ssrKey}/search`);
    loading.value = true;

    try {
      result.value = await _factoryParams.search(url);
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
