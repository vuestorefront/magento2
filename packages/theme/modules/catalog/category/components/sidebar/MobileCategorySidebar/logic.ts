import { computed, ref } from '@nuxtjs/composition-api';
import { CategoryTreeInterface } from '~/modules/catalog/category/types';

export const useMobileCategoryTree = (initialHistory: CategoryTreeInterface[] = []) => {
  const history = ref<CategoryTreeInterface[]>(initialHistory);
  const current = computed<CategoryTreeInterface | null>(() => history.value.at(-1) ?? null);
  const currentItems = computed<CategoryTreeInterface[]>(() => current.value?.items);
  const onGoCategoryDown = (category: CategoryTreeInterface) => {
    history.value.push(category);
  };
  const onGoCategoryUp = () => history.value.pop();

  return {
    history,
    current,
    currentItems,
    onGoCategoryUp,
    onGoCategoryDown,
  };
};
