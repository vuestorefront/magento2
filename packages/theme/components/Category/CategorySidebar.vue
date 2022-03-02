<template>
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
</template>

<script>
import {
  SfList,
  SfMenuItem,
  SfAccordion,
} from '@storefront-ui/vue';
import {
  defineComponent,
} from '@nuxtjs/composition-api';

import { useUiHelpers } from '~/composables';

export default defineComponent({
  name: 'CategorySidebarMenu',
  components: {
    SfList,
    SfMenuItem,
    SfAccordion,
  },
  props: {
    categoryTree: {
      type: Object,
      default: () => {},
    },
    activeCategory: {
      type: String,
      default: '',
    },
  },
  setup() {
    const uiHelpers = useUiHelpers();

    return {
      ...uiHelpers,
    };
  },
});
</script>

<style lang="scss" scoped>
.sf-divider{
  margin-bottom: var(--spacer-xs);
}
.list {
  --menu-item-font-size: var(--font-size--sm);

  &__item {
    &:first-child {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    &:not(:last-of-type):not(:first-child){
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    &__sub {
      padding:var(--spacer-xs) 0  0 var(--spacer-sm);
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
</style>
