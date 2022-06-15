<template>
  <SfSidebar
    :title="currentCategory && currentCategory.name || $t('Menu')"
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
          :label="$i18n.t('AllProductsFromCategory', { categoryName: currentCategory.name })"
          @click="navigate(currentCategory)"
        />
      </template>
      <SfMenuItem
        v-for="category in itemsIncludedInMenu"
        :key="category.uid"
        :label="category.name"
        class="mobile-menu-sidebar__item"
        @click="category.children && category.children.length > 0 ? onGoCategoryDown(category) : navigate(category)"
      />
    </SfList>
  </SfSidebar>
</template>
<script lang="ts">
import {
  SfSidebar, SfList, SfMenuItem,
} from '@storefront-ui/vue';
import {
  defineComponent, useRouter, useContext, computed,
} from '@nuxtjs/composition-api';
import { useUiHelpers, useUiState } from '~/composables';
import { useTraverseCategory } from '~/modules/catalog/category/helpers/useTraverseCategory';
import { CategoryTree } from '~/modules/GraphQL/types';
import { useMobileCategoryTree } from './logic';

export default defineComponent({
  components: {
    SfSidebar,
    SfList,
    SfMenuItem,
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { getCatLink } = useUiHelpers();
    const router = useRouter();
    const app = useContext();

    const { categoryAncestors: initialHistory, categoryTree } = useTraverseCategory();

    const navigate = (category: CategoryTree) => {
      toggleMobileMenu();
      const path = app.localePath(getCatLink(category) as string);
      router.push(path);
    };

    // A category with no child categories can't be entered into - it can only navigated to
    const initialHistoryWithSnippedSubcategoryLessTail = initialHistory.value.at(-1)?.children?.length
      ? initialHistory.value
      : initialHistory.value.slice(0, -1);

    const {
      current: currentCategory, history, currentItems, onGoCategoryUp, onGoCategoryDown,
    } = useMobileCategoryTree(initialHistoryWithSnippedSubcategoryLessTail);

    const itemsIncludedInMenu = computed(() => {
      const topLevelItems = categoryTree.value.children;
      const maybeCurrentCategoryItems = currentItems.value || topLevelItems;

      return maybeCurrentCategoryItems.filter((item) => item.include_in_menu);
    });

    return {
      currentCategory,
      onGoCategoryUp,
      onGoCategoryDown,
      history,
      navigate,
      isMobileMenuOpen,
      toggleMobileMenu,
      itemsIncludedInMenu,
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
