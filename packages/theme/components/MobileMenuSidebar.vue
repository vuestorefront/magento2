<template>
  <SfSidebar
    :visible="isMobileMenuOpen"
    :title="$t('Menu')"
    class="mobile-menu-sidebar sf-sidebar--left"
    @close="toggleMobileMenu"
  >
    <SfList class="mobile-menu-sidebar__list">
      <SfMenuItem
        v-for="(category, index) in categoryTree"
        :key="index"
        :label="category.label"
        :link="localePath(getAgnosticCatLink(category))"
        class="mobile-menu-sidebar__item"
        @click.native="toggleMobileMenu"
      />
    </SfList>
  </SfSidebar>
</template>
<script>
import { SfSidebar, SfList, SfMenuItem } from '@storefront-ui/vue';
import { defineComponent, computed } from '@nuxtjs/composition-api';
import { categoryGetters, useCategory } from '@vue-storefront/magento';
import { useUiHelpers, useUiState } from '~/composables';

export default defineComponent({
  name: 'MobileMenuSidebar',
  components: {
    SfSidebar,
    SfList,
    SfMenuItem,
  },
  setup() {
    const { categories } = useCategory('AppHeader:CategoryList');
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { getAgnosticCatLink } = useUiHelpers();

    const categoryTree = computed(
      () => categoryGetters.getCategoryTree(categories.value?.[0])?.items.filter((c) => c.count > 0),
    );

    return {
      categoryTree,
      isMobileMenuOpen,
      toggleMobileMenu,
      getAgnosticCatLink,
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
</style>
