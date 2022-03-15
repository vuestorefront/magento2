<template>
  <SfSidebar
    :title="currentCategory && currentCategory.label || $t('Menu')"
    visible
    class="mobile-menu-sidebar sf-sidebar--left"
    @close="toggleMobileMenu"
  >
    <SfList class="mobile-menu-sidebar__list">
      <template v-if="currentCategory">
        <SfMenuItem
          class="mobile-menu-sidebar__item"
          :label="$i18n.t('Go back')"
          @click="onGoCategoryUp()"
        >
          <template #mobile-nav-icon>
            <div v-show="false" />
          </template>
        </SfMenuItem>

        <SfMenuItem
          class="mobile-menu-sidebar__item"
          :label="$i18n.t('AllProductsFromCategory', { categoryName: currentCategory.label })"
          :count="currentCategory.count"
          @click="navigate(currentCategory)"
        />
      </template>
      <SfMenuItem
        v-for="(category, index) in currentItems || categoryTree.items"
        :key="index"
        :label="category.label"
        :count="category.count"
        class="mobile-menu-sidebar__item"
        @click="category.items.length === 0 ? navigate(category) : onGoCategoryDown(category)"
      />
    </SfList>
  </SfSidebar>
</template>
<script lang="ts">
import {
  SfSidebar, SfList, SfMenuItem,
} from '@storefront-ui/vue';
import {
  defineComponent, useRouter, useContext, useRoute,
} from '@nuxtjs/composition-api';
import { useUiHelpers, useUiState } from '~/composables';
import { CategoryTreeInterface } from '~/modules/catalog/category/types';
import { findActiveCategory, findCategoryAncestors } from '~/modules/catalog/category/helpers';
import { useApi } from '~/composables/useApi';
import { useCategoryStore } from '~/stores/category';
import { useMobileCategoryTree } from './logic';

export default defineComponent({
  components: {
    SfSidebar,
    SfList,
    SfMenuItem,
  },
  setup() {
    const api = useApi();
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { getAgnosticCatLink } = useUiHelpers();
    const router = useRouter();
    const route = useRoute();
    const app = useContext();

    const categoryStore = useCategoryStore(api);
    const categoryTree = categoryStore.categories;

    const navigate = (category: CategoryTreeInterface) => {
      toggleMobileMenu();
      const path = app.localePath(getAgnosticCatLink(category) as string);
      router.push(path);
    };

    const activeCategory = findActiveCategory(categoryTree, route.value.fullPath.replace('/default/c', ''));
    const initialHistory: CategoryTreeInterface[] = activeCategory === null ? [] : findCategoryAncestors(categoryTree, activeCategory);

    // A category-less category can't be entered into - it can only navigated to
    const initialHistoryWithSnippedSubcategorylessTail = initialHistory.at(-1)?.items.length
      ? initialHistory
      : initialHistory.slice(0, -1);

    const {
      current: currentCategory, history, currentItems, onGoCategoryUp, onGoCategoryDown,
    } = useMobileCategoryTree(initialHistoryWithSnippedSubcategorylessTail);

    return {
      currentCategory,
      currentItems,
      onGoCategoryUp,
      onGoCategoryDown,
      categoryTree,
      history,

      navigate,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.mobile-menu-sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;

  &__list {
    .mobile-menu-sidebar__item {
      padding: var(--spacer-base) 0;
      --menu-item-font-size: 1.75rem;

      &:not(:first-of-type) {
        border-top: 1px solid var(--c-light);
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid var(--c-light);
      }
    }
  }

  ::v-deep {
    .nuxt-link-active {
      --menu-item-label-color: var(--c-primary);
    }
  }
}
.go-back {
  display: flex;
  align-items: center;
}
</style>
