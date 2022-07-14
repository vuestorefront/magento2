<template>
  <div
    v-if="hasChildren(currentCategory)"
    data-testid="navigation-subcategories"
    class="header-navigation__subcategories"
  >
    <div class="header-navigation__subcategories-inner">
      <div
        v-for="(catLvl1, idxLvl1) in currentCategory.children"
        :key="idxLvl1"
        class="header-navigation__subcategory"
        aria-haspopup="true"
      >
        <SfLink
          ref="lvl1CatRefs"
          class="header-navigation__link1"
          :link="localePath(getCatLink(catLvl1))"
          :data-children="catLvl1.children.length"
          @click.native="$emit('hideSubcategories')"
          @focus.native="setupNav()"
          @keydown.right.native.prevent="navRight()"
          @keydown.left.native.prevent="navLeft()"
          @keydown.down.native.prevent="navDown()"
          @keydown.up.native.prevent="navUp()"
        >
          <h2 class="sf-heading sf-heading--left sf-heading sf-heading--left h5">
            {{ catLvl1.name }}
          </h2>
        </SfLink>
        <SfList v-if="hasChildren(catLvl1)">
          <SfListItem
            v-for="(catLvl2, idxLvl2) in catLvl1.children"
            :key="idxLvl2"
          >
            <SfLink
              ref="lvl2CatRefs"
              class="header-navigation__link2"
              :link="localePath(getCatLink(catLvl2))"
              tabindex="-1"
              @click.native="$emit('hideSubcategories')"
              @keydown.down.native.prevent="navDown()"
              @keydown.up.native.prevent="navUp()"
              @keydown.right.native.prevent="navRight()"
              @keydown.left.native.prevent="navLeft()"
            >
              {{ catLvl2.name }}
            </SfLink>
          </SfListItem>
        </SfList>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfLink, SfList,
} from '@storefront-ui/vue';
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import type { CategoryTree } from '~/modules/GraphQL/types';
import { useUiHelpers } from '~/composables';
import type { ComponentTemplateRef } from '~/types/componentTemplateRef';

export default defineComponent({
  name: 'HeaderNavigationSubcategories',
  components: {
    SfLink,
    SfList,
  },
  props: {
    currentCategory: {
      type: Object as PropType<CategoryTree | null>,
      default: () => null,
    },
    hasFocus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { getCatLink } = useUiHelpers();
    const lvl1CatRefs = ref<ComponentTemplateRef[]>();
    const lvl2CatRefs = ref<ComponentTemplateRef[]>();
    const lvl2GroupedCatRefs = ref<ComponentTemplateRef[][]>();

    const hasChildren = (category: CategoryTree) => Boolean(category?.children.length > 0);

    const getGroupedLvl2CatRefs = () : ComponentTemplateRef[][] => {
      let current = 0;
      const result : ComponentTemplateRef[][] = [];
      lvl1CatRefs.value.forEach((lvl1CatRef) => {
        const groupCount = Number(lvl1CatRef.$el.dataset.children);
        const group = lvl2CatRefs.value.slice(current, current + groupCount);
        result.push(group);
        current += groupCount;
      });

      return result;
    };

    // Once submenu is opened we start from the very first element
    let lvl1CatFocusIdx = 0;
    // We start from the "outside" of lvl2Cats, navigation action must be performed to jump into lvl2CatTree
    let lvl2CatFocusIdx = -1;

    const navRight = () => {
      if (lvl1CatRefs.value[++lvl1CatFocusIdx]) {
        lvl1CatRefs.value[lvl1CatFocusIdx].$el.focus();
        lvl2CatFocusIdx = -1;
        lvl2GroupedCatRefs.value = getGroupedLvl2CatRefs();
      } else {
        lvl1CatFocusIdx--;
      }
    };

    const navLeft = () => {
      if (lvl1CatRefs.value[--lvl1CatFocusIdx]) {
        lvl1CatRefs.value[lvl1CatFocusIdx].$el.focus();
        lvl2CatFocusIdx = -1;
        lvl2GroupedCatRefs.value = getGroupedLvl2CatRefs();
      } else {
        lvl1CatFocusIdx++;
      }
    };

    const navDown = () => {
      lvl2CatFocusIdx++;
      if (lvl2CatFocusIdx !== -1 && !lvl2GroupedCatRefs.value[lvl1CatFocusIdx][lvl2CatFocusIdx]) {
        lvl2CatFocusIdx--;
        return;
      }
      lvl2GroupedCatRefs.value[lvl1CatFocusIdx][lvl2CatFocusIdx].$el.focus();
    };

    const navUp = () => {
      if (lvl2CatFocusIdx > 0) {
        lvl2CatFocusIdx--;
        lvl2GroupedCatRefs.value[lvl1CatFocusIdx][lvl2CatFocusIdx].$el.focus();
        return;
      }

      if (lvl2CatFocusIdx === 0) {
        lvl1CatRefs.value[lvl1CatFocusIdx].$el.focus();
        lvl2CatFocusIdx = -1;

        return;
      }

      if (lvl2CatFocusIdx === -1) {
        emit('hideSubcategories');
      }
    };

    const setupNav = () => {
      lvl2CatFocusIdx = -1;
      lvl1CatRefs.value[lvl1CatFocusIdx].$el.focus();
      lvl2GroupedCatRefs.value = getGroupedLvl2CatRefs();
    };

    onMounted(() => {
      if (props.hasFocus) {
        setupNav();
      }
    });

    return {
      getCatLink,
      hasChildren,
      navRight,
      navLeft,
      navDown,
      navUp,
      setupNav,
      lvl1CatRefs,
      lvl2CatRefs,
    };
  },
});
</script>
<style lang="scss" scoped>
.header-navigation {
  &__subcategories {
    position: absolute;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 3px var(--c-primary);
    left: 0;
    padding: 30px;
    right: 0;
    top: 90px;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;

    &-inner {
      display: flex;
      justify-content: flex-start;
      width: var(--header-width, 77.5rem);
    }
  }

  &__subcategory {
    flex: 0 0 25%;
  }

  .sf-heading {
    margin-bottom: var(--spacer-sm);
    &__title {
      font-weight: bold;
    }
    &.h5 {
      font-size: var(--h5-font-size)
    }
  }

  .sf-link {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__link2 {
    &:hover {
      color: var(--c-primary);

    }
  }
}
</style>
