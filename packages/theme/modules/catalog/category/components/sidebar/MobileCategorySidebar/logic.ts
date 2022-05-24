import { computed, ref } from '@nuxtjs/composition-api';
import { CategoryTree } from '~/modules/GraphQL/types';

export const useMobileCategoryTree = (initialHistory: CategoryTree[] = []) => {
  const history = ref<CategoryTree[]>(initialHistory);
  const current = computed<CategoryTree | null>(() => history.value.at(-1) ?? null);
  const currentItems = computed<CategoryTree[]>(() => current.value?.children);
  const onGoCategoryDown = (category: CategoryTree) => {
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
