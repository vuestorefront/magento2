<template>
  <div
    class="header-navigation"
    @mouseleave="setCurrentCategory(null)"
  >
    <div class="sf-header-navigation-item__item sf-header-navigation-item__item--desktop">
      <HeaderNavigationItem
        v-for="(category, index) in categoryTree"
        :key="index"
        ref="lvl0CatRefs"
        :data-testid="category.uid"
        :label="category.name"
        :link="localePath(getCatLink(category))"
        tabindex="1"
        aria-haspopup="true"
        class="nav-item"
        :data-index="index"
        :has-children="hasChildren(category)"
        @mouseenter.native.prevent="onMouseEnter(category)"
        @keydown.down.native.prevent="setCurrentCategory(category)"
        @keydown.up.native.prevent="setCurrentCategory(null)"
        @keyup.tab.native.prevent="setFocus($event)"
        @keydown.right.native.prevent="navRight()"
        @keydown.left.native.prevent="navLeft()"
      />
    </div>
    <HeaderNavigationSubcategories
      v-if="hasChildren(currentCategory)"
      :current-category="currentCategory"
      :has-focus="hasFocus"
      @hideSubcategories="focusRootElementAndHideSubcategories"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent, PropType, ref,
} from '@nuxtjs/composition-api';

import { CategoryTree } from '~/modules/GraphQL/types';
import { useUiHelpers } from '~/composables';
import type { ComponentTemplateRef } from '~/types/componentTemplateRef';
import HeaderNavigationItem from './HeaderNavigationItem.vue';

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

    const currentCategory = ref<CategoryTree | null>(null);
    const lvl0CatRefs = ref<ComponentTemplateRef[]>();
    const hasFocus = ref(false);
    let lvl0CatFocusIdx = 0;
    let focusedElement : HTMLElement | null = null;

    const setCurrentCategory = (category: CategoryTree | null) => {
      currentCategory.value = category;
    };

    const hasChildren = (category: CategoryTree) => Boolean(category?.children?.length);

    const setFocus = (event: MouseEvent & { target: HTMLElement }) => {
      focusedElement = event.target;
      lvl0CatFocusIdx = Number(event.target.dataset.index);
      hasFocus.value = true;
    };

    const focusRootElementAndHideSubcategories = () => {
      setCurrentCategory(null);
      if (focusedElement !== null) focusedElement.focus();
    };

    const navRight = () => {
      lvl0CatFocusIdx++;
      if (lvl0CatRefs.value[lvl0CatFocusIdx]) {
        lvl0CatRefs.value[lvl0CatFocusIdx].$el.focus();
        focusedElement = lvl0CatRefs.value[lvl0CatFocusIdx].$el;
      } else {
        lvl0CatFocusIdx--;
      }
    };

    const navLeft = () => {
      lvl0CatFocusIdx--;
      if (lvl0CatRefs.value[lvl0CatFocusIdx]) {
        lvl0CatRefs.value[lvl0CatFocusIdx].$el.focus();
        focusedElement = lvl0CatRefs.value[lvl0CatFocusIdx].$el;
      } else {
        lvl0CatFocusIdx++;
      }
    };

    const onMouseEnter = (category: CategoryTree) => {
      currentCategory.value = category;
      focusedElement = null;
      hasFocus.value = false;
    };

    return {
      getCatLink,
      setCurrentCategory,
      currentCategory,
      hasChildren,
      setFocus,
      focusRootElementAndHideSubcategories,
      lvl0CatRefs,
      navRight,
      navLeft,
      hasFocus,
      onMouseEnter,
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
