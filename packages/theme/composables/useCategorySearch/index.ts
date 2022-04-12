import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { CategorySearchQueryVariables } from '~/modules/GraphQL/types';
import type { Category } from '~/composables/types';
import type { UseCategoryErrors, UseCategorySearchInterface } from './useCategorySearch';

/**
 * The `useCategorySearch()` composable allows searching for categories. It is
 * commonly used in subtrees navigation.
 */
export function useCategorySearch(): UseCategorySearchInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseCategoryErrors>({
    search: null,
  });
  const result = ref<Category[] | null>(null);

  const search = async (searchParams: CategorySearchQueryVariables) => {
    Logger.debug('useCategory/search', searchParams);

    try {
      const { filters } = searchParams;
      const { data } = await app.context.$vsf.$magento.api.categorySearch({ filters });

      Logger.debug('[Result]:', { data });

      result.value = data.categoryList;
    } catch (err) {
      error.value.search = err;
      Logger.error('useCategory/search', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    loading: readonly(loading),
    error: readonly(error),
    result: readonly(result),
  };
}

export * from './useCategorySearch';
export default useCategorySearch;
