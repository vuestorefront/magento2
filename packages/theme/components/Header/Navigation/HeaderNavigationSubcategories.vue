<template>
  <div
    v-if="hasChildren(currentCategory)"
    data-testid="navigation-subcategories"
    class="header-navigation__subcategories"
  >
    <div
      v-for="(catLvl1, idxLvl1) in currentCategory.children"
      :key="idxLvl1"
      class="header-navigation__subcategory"
    >
      <SfLink
        class="header-navigation__link1"
        :link="localePath(getCatLink(catLvl1))"
        @click.native="$emit('hideSubcategories')"
      >
        <SfHeading
          :level="5"
          :title="catLvl1.name"
          class="sf-heading sf-heading--left"
        />
      </SfLink>

      <SfList v-if="hasChildren(catLvl1)">
        <SfListItem
          v-for="(catLvl2, idxLvl2) in catLvl1.children"
          :key="idxLvl2"
        >
          <SfLink
            class="header-navigation__link2"
            :link="localePath(getCatLink(catLvl2))"
            @click.native="$emit('hideSubcategories')"
          >
            {{ catLvl2.name }}
          </SfLink>
        </SfListItem>
      </SfList>
    </div>
  </div>
</template>
<script lang="ts">
import { SfLink, SfList, SfHeading } from '@storefront-ui/vue';
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { CategoryTree } from '~/modules/GraphQL/types';
import { useUiHelpers } from '~/composables';

export default defineComponent({
  name: 'HeaderNavigationSubcategories',
  components: {
    SfLink,
    SfList,
    SfHeading,
  },
  props: {
    currentCategory: {
      type: Object as PropType<CategoryTree | null>,
      default: () => null,
    },
  },
  setup() {
    const { getCatLink } = useUiHelpers();
    const hasChildren = (category: CategoryTree) => Boolean(category?.children.length > 0);

    return {
      getCatLink,
      hasChildren,
    };
  },
});
</script>
<style lang="scss" scoped>
.header-navigation {
  &__subcategories {
    display: flex;
    position: absolute;
    z-index: 10;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 3px var(--c-primary);
    left: 0;
    padding: 30px;
    right: 0;
    top: 95%;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  &__subcategory {
    flex: 0 0 25%;
  }

  .sf-heading {
    margin-bottom: var(--spacer-sm);
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
