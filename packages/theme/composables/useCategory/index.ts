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
    load: null,
  });
  const categories: Ref<Array<Category>> = ref(null);

  // eslint-disable-next-line consistent-return
  const load = async (searchParams: CategoryListQueryVariables) => {
    Logger.debug('useCategory/load', searchParams);

    try {
      loading.value = true;
      const { data } = await app.context.$vsf.$magento.api.categoryList(searchParams);
      Logger.debug('[Result]:', { data });
      categories.value = data.categories.items;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useCategory/search', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    loading,
    error,
    categories,
  };
};

export default useCategory;
