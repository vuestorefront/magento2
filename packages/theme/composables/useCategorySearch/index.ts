// eslint-disable-next-line import/no-extraneous-dependencies
import { ref, Ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { CategorySearchQueryVariables } from '~/modules/GraphQL/types';
import { UseCategoryErrors, UseCategorySearchInterface } from '~/composables/useCategorySearch/useCategorySearch';
import { Category } from '~/composables/types';

export function useCategorySearch(): UseCategorySearchInterface {
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseCategoryErrors> = ref({
    search: null,
  });
  const result: Ref<Array<Category>> = ref(null);

  // eslint-disable-next-line consistent-return
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
    loading,
    error,
    result,
  };
}

export default useCategorySearch;
