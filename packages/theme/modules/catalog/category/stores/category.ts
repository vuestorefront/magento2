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
      const { data }: { data: { categories?: CategoryResult } } = await this.$nuxt.app.$vsf.$magento.api.customQuery({ query: categoryListGql });
      this.rawCategories = data?.categories ?? null;
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
