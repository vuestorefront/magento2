<template>
  <div
    class="header-navigation"
  >
    <div class="header-navigation__main">
      <HeaderNavigationItem
        v-for="(category, index) in categoryTree"
        :key="index"
        :data-testid="category.uid"
        class="nav-item"
        :label="category.name"
        :link="localePath(getCatLink(category))"
        @mouseenter.native="setCurrentCategory(category)"
        @keyup.tab.native="setCurrentCategory(category)"
      />
    </div>
    <HeaderNavigationSubcategories
      v-if="hasChildren(currentCategory)"
      :current-category="currentCategory"
      @hideSubcategories="setCurrentCategory(null)"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent, PropType, ref,
} from '@nuxtjs/composition-api';
import HeaderNavigationItem from './HeaderNavigationItem.vue';

import { CategoryTree } from '~/modules/GraphQL/types';
import { useUiHelpers } from '~/composables';

export default defineComponent({
  name: 'HeaderNavigation',
  components: {
    HeaderNavigationSubcategories: () => import('~/components/Header/Navigation/HeaderNavigationSubcategories.vue'),
    HeaderNavigationItem,
  },
  props: {
    categoryTree: {
      type: Array as PropType<CategoryTree[]>,
      default: () => [],
    },
  },
  setup() {
    const { getCatLink } = useUiHelpers();
    const currentCategory = ref<CategoryTree>(null);

    const setCurrentCategory = (category: CategoryTree | null) => {
      currentCategory.value = category;
    };

    const hasChildren = (category: CategoryTree) => Boolean(category?.children);

    return {
      getCatLink,
      setCurrentCategory,
      currentCategory,
      hasChildren,
    };
  },
});
</script>
<style lang="scss" scoped>
.header-navigation {
  &__main {
    display: flex;
  }
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-sm);

  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}
</style>
