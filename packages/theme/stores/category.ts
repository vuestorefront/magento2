import { defineStore } from 'pinia';
import { CategoryResult } from '~/composables';
import categoryListGql from '~/stores/graphql/categoryList.gql';
import { buildCategoryTree } from '~/modules/catalog/category/helpers';

interface CategoryState {
  rawCategories: CategoryResult | null
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    rawCategories: null,
  }),
  actions: {
    async load() {
      const response = await this.$nuxt.$graphql.query.request<{ categories: CategoryResult }>(categoryListGql);
      this.rawCategories = response.categories ?? null;
    },
  },
  getters: {
    categories(state) {
      if (state.rawCategories === null) {
        return null;
      }
      const rootCategory = state.rawCategories?.items[0];
      const shouldIncludeProductCounts = true;
      const currentCategory = '';
      const agnosticCategoryTree = buildCategoryTree(rootCategory, currentCategory, shouldIncludeProductCounts);
      return agnosticCategoryTree;
    },
  },
});
