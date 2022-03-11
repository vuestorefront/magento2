<template>
  <SkeletonLoader
    :is-loading="isLoading"
    height="500px"
  >
    <SfAccordion
      :open="activeCategory"
      :show-chevron="true"
    >
      <SfAccordionItem
        v-for="(cat, i) in categoryTree.items"
        :key="i"
        :header="cat.label"
      >
        <SfList class="list">
          <SfListItem
            v-for="(subCat, j) in cat.items"
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

<script>
import {
  SfList,
  SfMenuItem,
  SfAccordion,
} from '@storefront-ui/vue';
import {
  defineComponent, onMounted, ref,
  useRoute,
} from '@nuxtjs/composition-api';

import { useUiHelpers } from '~/composables';
import { useSidebar } from './useSidebar.ts';
import SkeletonLoader from '~/components/SkeletonLoader';

export default defineComponent({
  name: 'CategorySidebar',
  components: {
    SfList,
    SfMenuItem,
    SfAccordion,
    SkeletonLoader,
  },
  setup() {
    const uiHelpers = useUiHelpers();
    const categoryTree = ref({});
    const activeCategory = ref('');
    const isLoading = ref(true);
    const route = useRoute();
    const { loadCategoryTree, findActiveCategory } = useSidebar();

    onMounted(async () => {
      categoryTree.value = await loadCategoryTree() ?? {};
      activeCategory.value = findActiveCategory(categoryTree.value, route.value.fullPath);
      isLoading.value = false;
    });

    return {
      ...uiHelpers,
      categoryTree,
      activeCategory,
      isLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "sidebar";
</style>
