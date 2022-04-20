import { defineStore } from 'pinia';
import { CategoryResult } from '~/composables';
import categoryListGql from './graphql/categoryList.gql';

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

      return state.rawCategories?.items[0];
    },
  },
});
