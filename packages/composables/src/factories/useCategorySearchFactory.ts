import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseCategorySearch, UseCategorySearchErrors } from '../types/composables';

export interface UseCategorySearchFactory<CATEGORY, API extends PlatformApi = any> extends FactoryParams<API> {
  search: (context: Context, params: { term: string }) => Promise<CATEGORY[]>;
}

export function useCategorySearchFactory<CATEGORY, API extends PlatformApi = any>(
  factoryParams: UseCategorySearchFactory<CATEGORY, API>,
) {
  return function useCategorySearch(id: string = ''): UseCategorySearch<CATEGORY, API> {
    const ssrKey = id || 'useCategorySearch';
    // @ts-ignore
    const result = sharedRef<CATEGORY>([], `${ssrKey}-result`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseCategorySearchErrors>({
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const search = async (params: { term: string }): Promise<CATEGORY[]> => {
      Logger.debug(`useCategorySearch/${ssrKey}/search`);

      try {
        loading.value = true;

        const data = await _factoryParams.search(params);

        result.value = data;

        error.value.search = null;

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
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
