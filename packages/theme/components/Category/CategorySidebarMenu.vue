<template>
  <div>
    <slot
      v-if="loading"
      name="loading"
      :loading="loading"
    />
    <slot
      v-else
      name="category"
      :category-tree="categoryTree"
      :active-category="activeCategory"
    >
      <SfAccordion
        :open="activeCategory"
        :show-chevron="true"
      >
        <SfAccordionItem
          v-for="(cat, i) in categoryTree && categoryTree.items"
          :key="i"
          :header="cat.label"
        >
          <SfList class="list">
            <SfListItem class="list__item">
              <SfMenuItem
                :count="cat.count || ''"
                :label="cat.label"
              >
                <template #label>
                  <nuxt-link
                    :to="localePath(th.getAgnosticCatLink(cat))"
                    :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                  >
                    All
                  </nuxt-link>
                </template>
              </SfMenuItem>
            </SfListItem>
            <SfDivider v-if="cat.items.length> 0" />
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
                    :to="localePath(th.getAgnosticCatLink(subCat))"
                    :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                  >
                    {{ label }}
                  </nuxt-link>
                </template>
              </SfMenuItem>
              <SfMenuItem
                v-for="(subSubCat, z) in subCat.items && subCat.items"
                :key="z"
                :count="subSubCat.count || ''"
                :label="subSubCat.label"
                class="list__item__sub"
              >
                <template #label="{ label }">
                  <nuxt-link
                    :to="localePath(th.getAgnosticCatLink(subSubCat))"
                    :class="subSubCat.isCurrent ? 'sidebar--cat-selected' : ''"
                  >
                    {{ label }}
                  </nuxt-link>
                </template>
              </SfMenuItem>
            </SfListItem>
          </SfList>
        </SfAccordionItem>
      </SfAccordion>
    </slot>
  </div>
</template>

<script>
import findDeep from 'deepdash/findDeep';
import {
  SfList,
  SfMenuItem,
  SfAccordion,
  SfDivider,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  ref,
} from '@vue/composition-api';
import {
  categoryGetters,
  useCategory,
} from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { useRoute } from '~/helpers/route/useRoute.ts';
import { useUiHelpers } from '~/composables';

export default defineComponent({
  name: 'CategorySidebarMenu',
  components: {
    SfList,
    SfMenuItem,
    SfAccordion,
    SfDivider,
  },
  props: {
    resolveUrl: Boolean,
  },
  setup(props, context) {
    const th = useUiHelpers();
    const {
      path,
      result,
      search: resolveUrl,
    } = useRoute(context);
    const {
      categories,
      search,
      loading,
    } = useCategory(`categoryList:${path}`);

    const categoryTree = computed(() => categoryGetters.getCategoryTree(
      categories.value?.[0],
      result.value?.entity_uid,
      false,
    ));

    const activeCategory = computed(() => {
      const items = categoryTree.value?.items;

      if (!items) {
        return '';
      }
      const categoryLabel = ref();
      const { parent: category } = findDeep(items, (value, key, parentValue, _deepCtx) => {
        if (key === 'isCurrent' && value) {
          // eslint-disable-next-line no-underscore-dangle
          categoryLabel.value = _deepCtx.obj[_deepCtx._item.path[0]].label;
        }
        return key === 'isCurrent' && value;
      });

      return categoryLabel.value || category?.label || items[0]?.label;
    });

    onSSR(async () => {
      if (props.resolveUrl) {
        await resolveUrl();
      }

      await search({
        pageSize: 20,
      });
    });

    return {
      th,
      loading,
      categoryTree,
      activeCategory,
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
