import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { Category } from '~/composables/types';
import type {
  UseCategoryErrors,
  UseCategoryInterface,
  UseCategoryParamsInput,
} from '~/composables/useCategory/useCategory';

export function useCategory(): UseCategoryInterface {
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseCategoryErrors> = ref({
    search: null,
  });
  const categories: Ref<Array<Category>> = ref(null);

  const search = async (searchParams: UseCategoryParamsInput) => {
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
}

export * from '~/composables/useCategory/useCategory';

export default useCategory;
