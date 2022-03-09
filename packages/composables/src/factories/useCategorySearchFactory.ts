import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
  ComposableFunctionArgs,
  PlatformApi,
} from '@vue-storefront/core';
import { UseCategorySearch, UseCategorySearchErrors } from '../types/composables';

export interface UseCategorySearchFactory<CATEGORY, CATEGORY_SEARCH_PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {
  search: (context: Context, params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>) => Promise<CATEGORY[]>;
}
/**
 * @deprecated since version <version?>
 *
 * @see <add docs link>
 */
export function useCategorySearchFactory<CATEGORY, CATEGORY_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseCategorySearchFactory<CATEGORY, CATEGORY_SEARCH_PARAMS, API>,
) {
  return function useCategorySearch(id: string = ''): UseCategorySearch<CATEGORY, CATEGORY_SEARCH_PARAMS, API> {
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
    const search = async (params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>): Promise<CATEGORY[]> => {
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
