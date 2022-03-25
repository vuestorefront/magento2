import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import {
  UseCategory, UseCategoryErrors, CategoryListQueryVariables,
} from '~/composables/useCategory/useCategory';

import { Category } from '~/composables/types';

export const useCategory = (): UseCategory => {
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseCategoryErrors> = ref({
    search: null,
  });
  const categories: Ref<Array<Category>> = ref(null);

  // eslint-disable-next-line consistent-return
  const search = async (searchParams: CategoryListQueryVariables) => {
    Logger.debug('useCategory/search', searchParams);

    try {
      loading.value = true;
      const { data } = await app.context.$vsf.$magento.api.categoryList(searchParams);
      Logger.debug('[Result]:', { data });
      categories.value = data.categories.items;
      error.value.search = null;
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
    categories,
  };
};

export default useCategory;
