// import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseCategorySearch } from '../types';

export interface UseCategorySearchFactory<CATEGORY> extends FactoryParams {
  search: (context: Context, params: { term: string }) => Promise<CATEGORY[]>;
}

export const useCategorySearchFactory = <ROUTER>(
  factoryParams: UseCategorySearchFactory<ROUTER>,
) => function useCategorySearch(id?: string): UseCategorySearch<ROUTER> {
  const ssrKey = id || 'useCategorySearch';
  // @ts-ignore
  const result = sharedRef<ROUTER>({}, `${ssrKey}-result`);
  const loading = sharedRef(false, `${ssrKey}-loading`);
  const error = sharedRef({
    search: null,
  }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  const search = async (params: { term: string }) => {
    Logger.debug(`useCategorySearch/${ssrKey}/search`);
    loading.value = true;

    try {
      const data = await _factoryParams.search(params);

      result.value = data;

      return data;
    } catch (err) {
      error.value.search = err;

      Logger.error(`useCategorySearch/${ssrKey}/search`, err);
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
