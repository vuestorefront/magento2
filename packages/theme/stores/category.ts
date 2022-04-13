import { defineStore } from 'pinia';
import categoryListGql from '~/modules/catalog/category/components/sidebar/command/categoryList.gql';
import { buildCategoryTree } from '~/modules/catalog/category/helpers';
import { CategoryTreeInterface } from '~/modules/catalog/category/types';

interface CategoryState {
  rawCategories: { categories: { items: CategoryTreeInterface[] } } | null
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    rawCategories: null,
  }),
  actions: {
    async load() {
      this.rawCategories = await this.$nuxt.$graphql.query.request(categoryListGql);
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
});
