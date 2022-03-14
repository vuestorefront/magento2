<template>
  <SkeletonLoader
    :is-loading="isLoading"
    height="500px"
  >
    <SfAccordion
      :open="topLevelCategoryLabel"
      show-chevron
    >
      <SfAccordionItem
        v-for="(cat, i) in categoryTree && categoryTree.items"
        :key="i"
        :header="cat.label"
      >
        <SfList class="list">
          <SfListItem
            v-for="(subCat, j) in cat && cat.items"
            :key="j"
            class="list__item"
          >
            <SfMenuItem
              :count="subCat.count || ''"
              :label="subCat.label"
            >
              <template #label="{ label }">
                <nuxt-link
                  :to="localePath(getAgnosticCatLink(subCat))"
                  :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                >
                  {{ label }}
                </nuxt-link>
              </template>
            </SfMenuItem>
            <SfMenuItem
              v-for="(subSubCat, z) in subCat.items"
              :key="z"
              :count="subSubCat.count || ''"
              :label="subSubCat.label"
              class="list__item__sub"
            >
              <template #label="{ label }">
                <nuxt-link
                  :to="localePath(getAgnosticCatLink(subSubCat))"
                  :class="{'sidebar--cat-selected': subSubCat.isCurrent}"
                >
                  {{ label }}
                </nuxt-link>
              </template>
            </SfMenuItem>
          </SfListItem>
        </SfList>
      </SfAccordionItem>
    </SfAccordion>
  </SkeletonLoader>
</template>

<script lang="ts">
import {
  SfList,
  SfMenuItem,
  SfAccordion,
} from '@storefront-ui/vue';

import {
  defineComponent, onMounted, ref,
  useRoute, computed,
} from '@nuxtjs/composition-api';
import { useUiHelpers } from '~/composables';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import { useApi } from '~/composables/useApi';
import { useCategoryStore } from '~/stores/category';
import { findActiveCategory, findCategoryAncestors } from '~/modules/catalog/category/helpers';
import { CategoryTreeInterface } from '../../types';

export default defineComponent({
  components: {
    SfList,
    SfMenuItem,
    SfAccordion,
    SkeletonLoader,
  },
  setup() {
    const uiHelpers = useUiHelpers();
    const route = useRoute();
    const api = useApi();

    const categoryStore = useCategoryStore(api);
    const categoryTree = computed(() => categoryStore.categories);
    const activeCategory = ref<CategoryTreeInterface | null>(null);
    const activeCategoryAncestors = ref(null);
    const isLoading = ref(true);

    onMounted(async () => {
      if (categoryStore.categories === null) {
        await categoryStore.load();
      }
      activeCategory.value = findActiveCategory(categoryTree.value, route.value.fullPath.replace('/default/c', ''));
      activeCategoryAncestors.value = findCategoryAncestors(categoryStore.categories, activeCategory.value);
      isLoading.value = false;
    });

    const topLevelCategoryLabel = computed(() => activeCategoryAncestors.value?.[0]?.label);

    return {
      ...uiHelpers,
      categoryTree,
      isLoading,
      topLevelCategoryLabel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "sidebar";
</style>
