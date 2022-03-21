import { defineStore } from 'pinia';
import type { Pinia } from 'pinia';
import categoryListGql from '~/modules/catalog/category/components/sidebar/command/categoryList.gql';
import { buildCategoryTree } from '~/modules/catalog/category/helpers';
import type { useApi } from '~/composables/useApi';
import type { CategoryTreeInterface } from '~/modules/catalog/category/types';
import type { CategoryListQuery } from '~/composables/types';

interface CategoryState {
  rawCategories: { categories: { items: CategoryTreeInterface[] } } | null
}

export const useCategoryStore = (api: ReturnType<typeof useApi>, $pinia?: Pinia) => defineStore('category', {
  state: (): CategoryState => ({
    rawCategories: null,
  }),
  actions: {
    async load() {
      this.rawCategories = await api.query<CategoryListQuery, null>({
        document: categoryListGql,
        debugInfo: 'Category store - load categories',
      });
    },
  },
  getters: {
    categories(state) {
      if (state.rawCategories === null) {
        return null;
      }
      const rootCategory = state.rawCategories?.categories.items[0];
      const shouldIncludeProductCounts = true;
      const currentCategory = '';
      const agnosticCategoryTree = buildCategoryTree(rootCategory, currentCategory, shouldIncludeProductCounts);
      return agnosticCategoryTree;
    },
  },
})($pinia);
