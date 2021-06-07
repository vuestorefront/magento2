import { computed } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseCategorySearch, UseCategorySearchErrors } from '../types/composeables';

export interface UseCategorySearchFactory<CATEGORY> extends FactoryParams {
  search: (context: Context, params: { term: string }) => Promise<CATEGORY[]>;
}

export function useCategorySearchFactory<CATEGORY>(
  factoryParams: UseCategorySearchFactory<CATEGORY>,
) {
  return function useCategorySearch(id: string = ''): UseCategorySearch<CATEGORY> {
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
